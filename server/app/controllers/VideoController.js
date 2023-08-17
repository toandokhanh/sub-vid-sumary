const Video = require('../models/Video')
const ResultSummarization = require('../models/ResultSummarization')
const NoiseReduction = require('../models/NoiseReduction')
const TextSummarization = require('../models/TextSummarization')
const ResultSubtitle = require('../models/ResultSubtitle')
const Language = require('../models/Language')
const request = require('request')
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const accessAsync = promisify(fs.access);
const readFileAsync = promisify(fs.readFile);
class VideoController{
    // [GET] localhost:5000/video
    index(req, res){
        // NoiseReduction.find()
        //     .then((NoiseReductions) => {
        //         res.json(NoiseReductions)
        //     })
        //     .catch(error);
    }
    async getAllVideo(req, res){
        const videoAll = await Video.find({ user: req.userId  });
        //simple validation
        if (!videoAll)
            return res
                .status(400)
                .json({ success: false, message: 'Video not found!' })
        return res
            .status(200)
            .json({ success: true, message: 'ok', videoAll })
    };


    async getVideoDetail(req, res){
        const dateTime = req.params.id; // dateTime => primary key video
        // Simple validation
        if (!dateTime)
            return res
                .status(400)
                .json({ success: false, message: 'Detailed video not found' })
        try {
            const video = await Video.findOne({ date_time: dateTime });
            if (!video)
                return res
                    .status(400)
                    .json({ success: false, message: 'Detailed video not found' }) 
            const videoResult = await ResultSummarization.findOne({ _id: video.resultSummarization});
            if(!videoResult)
                return res
                        .status(400)
                        .json({ success: false, message: 'Result not found!' })

            const NoiseReductionId = await NoiseReduction.findOne({ _id: videoResult.noiseReduction });
            const TextSummarizationId = await TextSummarization.findOne({ _id: videoResult.textSummarization});
            if (!NoiseReductionId || !TextSummarizationId)
                return res
                    .status(400)
                    .json({ success: false, message: 'Result not found!' })
            // all good
            return res
                .status(200)
                .json({ success: true, message: 'ok' , result:videoResult, NoiseReductionName: NoiseReductionId.name,TextSummarizationName: TextSummarizationId.name})
        } catch (error) {
            console.log(error);
                    res.status(500).json({success: false, message:'Internal Server Error'});
        }
    };



    async createSubtitle(req, res) {
        const { video,
            sourceLanguage,
            targetLanguage,
            algorithm } = req.body;
        // Simple validation
        if (!video || !sourceLanguage || !targetLanguage || !algorithm)
        return res
            .status(400)
            .json({ success: false, message: 'Lack of information' });
        // call FLASK API (app.py) 
        const dataToSend = req.body;
        const apiUrl = process.env.FLASKAPI_URL; 
        request.post(
            {
                url: apiUrl+'/createSubtitle',
                json: dataToSend
            },
            async (error, response, body) => {
                if (error) {
                    console.error('Error while calling API FLASK:', error);
                    res.status(500).json({ success: false, message: 'Server internal error' });
                } else {
                    const {algorithm, dateTime, emty, kb, outputVideoPath,outputWavPath, processingTime, sourceLanguage, srtPath, targetLanguage, time, txtPath, videoPath, wavPath} = body;
                    // tìm thuât toán giảm nhiểu
                    try {
                        const algorithmId = await NoiseReduction.findOne({id: algorithm})
                        const sourceLanguageId = await Language.findOne({ id: sourceLanguage });
                        const targetLanguageId = await Language.findOne({ id: targetLanguage });
                        if (!algorithmId || !sourceLanguageId || !targetLanguageId)
                            return res
                                .status(400)
                                .json({ success: false, message: 'Sevice not found!' })

                        const newResultSubtitle = new ResultSubtitle({
                            noiseReduction: algorithmId,
                            wavPath,
                            outputWavPath,
                            outputVideoPath,
                            processingTime,
                            txtPath,
                            srtPath
                        })
                        await newResultSubtitle.save();

                        const newVideo = new Video({
                            date_time: dateTime,
                            path_video: videoPath,
                            capacity: kb,
                            time: time,
                            sourceLanguage: sourceLanguageId,
                            targetLanguage: targetLanguageId,
                            user: req.userId,
                            resultSummarization:newResultSubtitle._id
                        });
                        await newVideo.save();
                        res.status(200).json({ success: true, message: 'Video Subtitle created successfully', newVideo });
                    } catch (error) {
                        console.error('Error accessing/reading files:', error);
                        res.status(500).json({ success: false, message: 'Server internal error' });
                    }

                }   
            });
    };



    async createSummary(req, res) {
        const { video, language, noise, summary, sentence } = req.body;
        
        // Simple validation
        if (!video || !language || !noise || !summary || !sentence)
            return res
                .status(400)
                .json({ success: false, message: 'Lack of information' });
        
        // call FLASK API (app.py) 
        const dataToSend = req.body;
        const apiUrl = process.env.FLASKAPI_URL; 
        request.post(
            {
                url: apiUrl+'/createSummarize',
                json: dataToSend
            },
            async (error, response, body) => {
                if (error) {
                    console.error('Error while calling API FLASK:', error);
                    res.status(500).json({ success: false, message: 'Server internal error' });
                } else {
                    var { sourcePath, sumarySourcePath, dateTime, pathVideo, kb, time, language, sentenceIP, wordIP, sentenceOP, wordOP, noiseID, summaryID, processingTime, topic, r1R, r1P, r1F, r2R, r2P, r2F, rlR, rlP, rlF } = body;
                    try {
                        const textSummarizationId = await TextSummarization.findOne({ id: summaryID });
                        const noiseReductionId = await NoiseReduction.findOne({ id: noiseID });
                    
                        if (!textSummarizationId || !noiseReductionId) {
                            return res.status(400).json({ success: false, message: 'Algorithm not found!' });
                        }
                    
                        const sourcePathConvert = sourcePath.replace(/_en\.txt/g, '_en_vi.txt');
                        await accessAsync(path.resolve(__dirname, '../' + sourcePathConvert), fs.constants.F_OK);
                        sourcePath = sourcePathConvert;
                        const input_text = await readFileAsync(path.resolve(__dirname, '../' + sourcePath), 'utf8');
                        const output_text = await readFileAsync(path.resolve(__dirname, '../' + sumarySourcePath), 'utf8');
                        const newResultSummarization = new ResultSummarization({
                            textSummarization: textSummarizationId,
                            noiseReduction: noiseReductionId,
                            sentenceCountInput: wordIP,
                            wordCountInput: sentenceIP,
                            sentenceCountOutput: wordOP,
                            wordCountOutput: sentenceOP,
                            processing_time: processingTime,
                            path_text: sourcePath,
                            path_text_summary: sumarySourcePath,
                            input_text: input_text,
                            output_text: output_text,
                            predict_text_classification: topic,
                            rouge1: {
                                recall: r1R,
                                precision: r1P,
                                f1Score: r1F,
                            },
                            rouge2: {
                                recall: r2R,
                                precision: r2P,
                                f1Score: r2F,
                            },
                            rougel: {
                                recall: rlR,
                                precision: rlP,
                                f1Score: rlF,
                            },
                        });
                    
                        await newResultSummarization.save();
                    
                        const languageId = await Language.findOne({ id: language });
                        if (!languageId) {
                            return res.status(400).json({ success: false, message: 'Language not found!' });
                        }
                        const newVideo = new Video({
                            date_time: dateTime,
                            path_video: pathVideo,
                            capacity: kb,
                            time: time,
                            sourceLanguage: languageId,
                            user: req.userId,
                            resultSummarization: newResultSummarization._id,
                        });
                          await newVideo.save();
                          res.status(200).json({ success: true, message: 'Summary result created successfully', newVideo });
                    } catch (error) {
                        console.error('Error accessing/reading files:', error);
                        res.status(500).json({ success: false, message: 'Server internal error' });
                    }
            }
        });
    }
}



module.exports = new VideoController;