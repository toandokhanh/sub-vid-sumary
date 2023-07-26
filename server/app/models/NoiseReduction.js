const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const noiseReductionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
},{ timestamps: true },);

const NoiseReduction = mongoose.model('NoiseReduction', noiseReductionSchema);

module.exports = NoiseReduction;


