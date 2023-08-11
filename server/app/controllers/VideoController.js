const Video = require('../models/Video')
const ResultSummarization = require('../models/ResultSummarization')
const NoiseReduction = require('../models/NoiseReduction')
const TextSummarization = require('../models/TextSummarization')
const Language = require('../models/Language')
const request = require('request')
const fs = require('fs');
const path = require('path');
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
            const NoiseReductionId = await NoiseReduction.findOne({ _id: videoResult.noiseReduction });
            const TextSummarizationId = await TextSummarization.findOne({ _id: videoResult.textSummarization});
            if (!videoResult || !NoiseReductionId || !TextSummarizationId)
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
    async create(req, res) {
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
                url: apiUrl,
                json: dataToSend
            },
            async (error, response, body) => {
                if (error) {
                    console.error('Error while calling API FLASK:', error);
                    res.status(500).json({ success: false, message: 'Server internal error' });
                } else {
                    // Gọi API thành công
                    console.log('body')
                    console.log(body)
                    const { sourcePath, sumarySourcePath, dateTime, pathVideo, kb, time, language, sentenceIP, wordIP, sentenceOP, wordOP, noiseID, summaryID, processingTime, topic, r1R, r1P, r1F, r2R, r2P, r2F, rlR, rlP, rlF } = body;
                    
                    try {
                        const textSummarizationId = await TextSummarization.findOne({ id: summaryID });
                        const noiseReductionId = await NoiseReduction.findOne({ id: noiseID });
                        
                        if (!textSummarizationId || !noiseReductionId)
                            return res
                                .status(400)
                                .json({ success: false, message: 'Algorithm not found!' });
                        
                        // Đọc nội dung file đầu vào và file đầu ra
                        fs.readFile(path.resolve(__dirname, '../' + sourcePath), 'utf8', async (err, input_text) => {
                            if (err) {
                                console.error('Error reading input file:', err);
                                res.status(500).json({ success: false, message: 'Server internal error' });
                            } else {
                                fs.readFile(path.resolve(__dirname, '../' + sumarySourcePath), 'utf8', async (err, output_text) => {
                                    if (err) {
                                        console.error('Error reading output file:', err);
                                        res.status(500).json({ success: false, message: 'Server internal error' });
                                    } else {
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
                                        
                                        // Lưu thông tin video
                                        const languageId = await Language.findOne({ id: language });
                                        if (!languageId)
                                            return res
                                                .status(400)
                                                .json({ success: false, message: 'Language not found!' });
                                        
                                        const newVideo = new Video({
                                            date_time: dateTime,
                                            path_video: pathVideo,
                                            capacity: kb,
                                            time: time,
                                            language: languageId,
                                            user: req.userId, // Tồn tại trong middleware Auth
                                            resultSummarization: newResultSummarization._id
                                        });
                                        
                                        await newVideo.save();
                                        
                                        res
                                            .status(200)
                                            .json({ success: true, message: 'Summary result created successfully' , newVideo});
                                    }
                                });
                            }
                        });
                    } catch (error) {
                        console.log(error);
                        res.status(500).json({ success: false, message: 'Server internal error' });
                    }
                }
            }
        );
    }
}



module.exports = new VideoController;