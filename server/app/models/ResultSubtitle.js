const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const ResultSubtitleSchema = new mongoose.Schema ({
    noiseReduction: {
        type: ObjectId,
        ref: 'NoiseReduction'
    },
    wavPath: {type: String},
    outputWavPath: {type: String},
    outputVideoPath: {type: String},
    processingTime: {type: String},
    txtPath:{type: String},
    srtPath: {type: String}
    });

const ResultSubtitle = mongoose.model('ResultSubtitle',ResultSubtitleSchema);

module.exports = ResultSubtitle;