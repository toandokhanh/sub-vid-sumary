const express = require('express');
const VideoController = require('../app/controllers/VideoController')
const router = express.Router();
const verifyToken = require('../app/middleware/auth');
router.get('/getall', verifyToken, VideoController.getall);//localhost:8000/api/video
router.post('/create', verifyToken, VideoController.create);//localhost:8000/api/video/create
router.post('/save', verifyToken, VideoController.create);//localhost:8000/api/video/save

module.exports = router;