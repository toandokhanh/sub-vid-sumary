const express = require('express');
const VideoController = require('../app/controllers/VideoController')
const router = express.Router();

router.get('/', VideoController.index);//localhost:8000/video
router.get('/v1', VideoController.v1);//localhost:8000/video

module.exports = router;