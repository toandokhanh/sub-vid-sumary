const express = require('express');
const VideoController = require('../app/controllers/VideoController')
const router = express.Router();

router.get('/', VideoController.index);//localhost:8000/api/video
router.get('/getall', VideoController.v1);//localhost:8000/api/video/getall

module.exports = router;