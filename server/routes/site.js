const express = require('express');
const router = express.Router();
const SiteController = require('../app/controllers/SiteController')

router.get('/', SiteController.index);
router.get('/contacts', SiteController.contacts);

module.exports = router;