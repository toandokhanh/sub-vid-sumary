const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const ResultSubtitleSchema = () => {


}

const ResultTitle = mongoose.model('ResultTitle',ResultSubtitleSchema);

module.exports = ResultTitle;