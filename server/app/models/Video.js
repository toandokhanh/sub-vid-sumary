const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const videosSchema = new mongoose.Schema({
  date_time: {type: String},
  path_video: {type: String},
  capacity: {type: Number},
  time: {type: String},
  language: {
    type: ObjectId,
    ref: 'Language'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  resultSummarization: {
    type: ObjectId,
    ref: 'ResultSummarization'
  },
  path_text: {type: String},
  path_text_summary: {type: String},
  predict_text_classification: {type: String},
},{ timestamps: true },);

const Video = mongoose.model('Video', videosSchema);

module.exports = Video;
