const Videos = require('../models/ResultSummarization')

class VideoController{
    index(res, req, next){
        Videos.findById({_id: "64a0d4d365f8b0f1f5debb15"})
            .then((videos) => {
                req.json(videos)
            })
            .catch(next);
        // req.send('welcome page handle myvideo');
    }
    v1(res, req, next){
        req.send('hello');
    }
}



module.exports = new VideoController;