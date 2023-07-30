const Video = require('../models/Video')
const ResultSummarization = require('../models/ResultSummarization')
const NoiseReduction = require('../models/NoiseReduction')
const TextSummarization = require('../models/TextSummarization')
const request = require('request')
class VideoController{
    // [GET] localhost:5000/video
    index(req, res, next ){
        NoiseReduction.find()
            .then((NoiseReductions) => {
                res.json(NoiseReductions)
            })
            .catch(next);
        // req.send('welcome page handle myvideo');
    }
    getall(req, res, next ){
        res.send('Get all your videos');
    }
    
    async create(req, res) {
        // call FLASK API
        // console.log(req.body)
        const {video, language, noise, summary, sentence} = req.body;
        // Simple validation
        if (!video || !language || !noise || !summary || !sentence)
            return res
                .status(400)
                .json({ success: false, message: 'Lack of information' })
        // call FLASK API (app.py) 
        const dataToSend = req.body;
        const apiUrl = 'http://localhost:5000/api/createSummarize'; 
        request.post(
        {
            url: apiUrl,
            json: dataToSend
        },
        async (error, response, body) => {
            if (error) {
                console.error('Call error when FLASK API', error);
            } else {
                // call API ok
                const {sourcePath, sumarySourcePath, dateTime, pathVideo,kb,time,language,pathText,sentenceIP,wordIP,sentenceOP,wordOP,noiseID,summaryID,processingTime,topic,r1R,r1P,r1F,r2R,r2P,r2F,rlR,rlP,rlF} = body;
                
                // save the sumarization results 
                try {
                    const textSummarizationId = await TextSummarization.findOne({ id: summaryID });
                    const noiseReductionId = await NoiseReduction.findOne({ id: noiseID });
                    // console.log('textSummarizationId')
                    // console.log(textSummarizationId)
                    // console.log('noiseReductionId')
                    // console.log(noiseReductionId)
                    if (!textSummarizationId || !noiseReductionId)
                        return res
                            .status(400)
                            .json({ success: false, message: 'algorithms not found!' })
                    // all good
                    const newResultSummarization = new ResultSummarization({
                        textSummarization: textSummarizationId,
                        noiseReduction: noiseReductionId,
                        sentenceCountInput: sentenceIP,
                        wordCountInput: wordIP,
                        sentenceCountOutput: sentenceOP,
                        wordCountOutput: wordOP,
                        processing_time: processingTime,
                        path_text: sourcePath,
                        path_text_summary: sumarySourcePath,
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
                    
                    //
                    res
                        .status(200)
                        .json({ success: true, message:'Summary result created successfully' });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({success: false, message:'Internal Server Error'});
                }
            }
        });
    };
    
    
    async save(req, res, next ){
        const { textSummarization, noiseReduction, sentenceCountInput, wordCountInput, sentenceCountOutput, wordCountOutput, processing_time, rouge1, rouge2, rougel } = req.body;
        
        if (!textSummarization || !noiseReduction || !sentenceCountInput || !wordCountInput || !sentenceCountOutput || !wordCountOutput || !processing_time || !rouge1 || !rouge2 || !rougel)
            return res
                .status(400)
                .json({ success: false, message: 'not found' })
        try {
            const textSummarizationId = await TextSummarization.findOne({ id: textSummarization });
            const noiseReductionId = await NoiseReduction.findOne({ id: noiseReduction });
            if (!textSummarizationId || !noiseReductionId)
                return res
                    .status(400)
                    .json({ success: false, message: 'algorithms not found!' })

            // ok good
            const newResultSummarization = new ResultSummarization({
                textSummarization: textSummarizationId,
                noiseReduction: noiseReductionId,
                sentenceCountInput,
                wordCountInput,
                sentenceCountOutput,
                wordCountOutput,
                processing_time,
                rouge1,
                rouge2,
                rougel,
            });
            await newResultSummarization.save();
            // get user, video informations => save video model require('../models/Video')
            // .....
            // ......
            // .......
            // ........
            res
                .status(200)
                .json({ success: true, message:'Summary result created successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message:'Internal Server Error'});
        }
    }
}



module.exports = new VideoController;