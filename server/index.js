const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes')
const APP = express();
const dotenv = require("dotenv");
const multer = require('multer');
dotenv.config();
const PORT = process.env.PORT || 5000

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({extended :true}));
APP.use(cors());
APP.use(express.json());

// Khởi tạo Multer để xử lý tệp nhận từ client
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/videos'); // Thư mục lưu trữ tệp
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

// kết nối với database
const DB = require('./config/db');
DB.connect();
// Router
route(APP)

APP.listen(PORT, () => {
    console.log('Server is running on port ' + PORT );
});
