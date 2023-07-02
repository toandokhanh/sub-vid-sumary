const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes')
const APP = express();
const dotenv = require("dotenv");


dotenv.config();
const PORT = process.env.PORT || 5000
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({extended :true}));
APP.use(cors());

// kết nối với database
const DB = require('./config/db');
DB.connect();
// Router
route(APP)

APP.listen(PORT, () => {
    console.log('Server is running on port ' + PORT );
});
