const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Video = require('./Video')
const TextSummarization = require('./TextSummarization')
const NoiseReduction = require('./NoiseReduction')

const ResultSummarizationSchema = new mongoose.Schema({ 
  textSummarization: {
    type: ObjectId,
    ref: 'TextSummarization'
  }, 
  noiseReduction: {
    type: ObjectId,
    ref: 'NoiseReduction'
  }, 
  sentenceCountInput: { type: Number},
  wordCountInput: { type: Number},
  sentenceCountOutnput: { type: Number},
  wordCountOutnput: { type: Number},
  processing_time: { type: Number},
  rouge1: {
    recall: {
      type: Number,
      required: true
    },
    precision: {
      type: Number,
      required: true
    },
    f1Score: {
      type: Number,
      required: true
    }
  },
  rouge2: {
    recall: {
      type: Number,
      required: true
    },
    precision: {
      type: Number,
      required: true
    },
    f1Score: {
      type: Number,
      required: true
    }
  },
  rougel: {
    recall: {
      type: Number,
      required: true
    },
    precision: {
      type: Number,
      required: true
    },
    f1Score: {
      type: Number,
      required: true
    }
  }
});

const ResultSummarization = mongoose.model('ResultSummarization', ResultSummarizationSchema);

module.exports = ResultSummarization;


// ngôn ngữ => Language
// giải thuật lọc nhiểu => noiseReduction
// giải thuật tóm tắt văn bản => textSummarization
// video => Videos
// user => User