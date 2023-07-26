const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const textSummarizationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
},{ timestamps: true },);

const TextSummarization = mongoose.model('TextSummarization', textSummarizationSchema);

module.exports = TextSummarization;
