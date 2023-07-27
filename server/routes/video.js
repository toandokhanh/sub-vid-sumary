const express = require('express');
const VideoController = require('../app/controllers/VideoController')
const router = express.Router();

router.get('/getall', VideoController.getall);//localhost:8000/api/video
router.post('/create', VideoController.create);//localhost:8000/api/video/getall

module.exports = router;