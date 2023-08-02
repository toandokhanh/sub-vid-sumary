const express = require('express');
const VideoController = require('../app/controllers/VideoController')
const router = express.Router();
const verifyToken = require('../app/middleware/auth');
router.get('/getallvideo', verifyToken, VideoController.getAllVideo);//localhost:6000/api/video/getall
router.get('/getvideodetail/:id', verifyToken, VideoController.getVideoDetail);//localhost:6000/api/video/getall
router.post('/create', verifyToken, VideoController.create);//localhost:6000/api/video/create

module.exports = router;