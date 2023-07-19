const ResultSummarization = require('../models/ResultSummarization')
const NoiseReduction = require('../models/NoiseReduction')

class VideoController{
    // [GET] localhost:5000/video
    index(res, req, next){
        NoiseReduction.find()
            .then((NoiseReductions) => {
                req.json(NoiseReductions)
            })
            .catch(next);
        // req.send('welcome page handle myvideo');
    }
    v1(res, req, next){
        req.send('hello');
    }
}



module.exports = new VideoController;