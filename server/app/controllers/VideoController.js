const ResultSummarization = require('../models/ResultSummarization')
const NoiseReduction = require('../models/NoiseReduction')
const TextSummarization = require('../models/TextSummarization')
const { spawn } = require('child_process');
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
    
    async create(req, res){
        const {pathVideo} = req.body;
        console.log(pathVideo);
        // const pythonProcess = spawn('python3', ['../../python_scripts/recognize_final.py', '-l', 'vi', '-video', pathVideo, '-noise', 'deep', '-summary', 'lexrank', '-sentence', '2']);
        const pythonProcess = spawn('python3',["../python_scripts/a.py", pathVideo]);
        // Xử lý kết quả trả về từ Python
        pythonProcess.stdout.on('data', (data) => {
            const summary = data.toString(); // Dữ liệu trả về từ Python (tóm tắt văn bản)
            res.send(summary); // Gửi kết quả tóm tắt về frontend
        });

        // Xử lý lỗi nếu có
        pythonProcess.on('error', (error) => {
            console.error('Lỗi khi chạy mã Python:', error);
            res
                .status(500)
                .send('Đã xảy ra lỗi khi xử lý yêu cầu.');
        })
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