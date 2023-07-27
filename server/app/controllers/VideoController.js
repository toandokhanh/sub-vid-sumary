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
    getall(res, req, next){
        req.send('Get all your videos');
    }
    create(res, req, next){
        req.send('create your new videos');
    }
}



module.exports = new VideoController;