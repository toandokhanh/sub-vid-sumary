const express = require('express');
const VideoController = require('../app/controllers/VideoController')
const router = express.Router();
const verifyToken = require('../app/middleware/auth');

router.get('/getallvideo/summary', verifyToken, VideoController.getSummaryVideoAll);//localhost:5000/api/video/getall
router.get('/getallvideo/subtitle', verifyToken, VideoController.getSubtitleVideoAll);//localhost:5000/api/video/getall
router.get('/get/summary/detail/:id', verifyToken, VideoController.getVideoSummaryDetail);//localhost:5000/api/video/get/summary/detail/32323_3213213
router.get('/get/subtitle/detail/:id', verifyToken, VideoController.getVideoSubtitleDetail);//localhost:5000/api/video/get/subtitle/detail/32323_3213213
router.post('/create/summary', verifyToken, VideoController.createSummary);//localhost:5000/api/video/create/summary
router.post('/create/subtitle', verifyToken, VideoController.createSubtitle);//localhost:5000/api/video/create/subtitle

module.exports = router;