const mongoose = require('mongoose');
const NoiseReduction = require('../../../app/models/NoiseReduction');
const TextSummarization = require('../../../app/models/TextSummarization');
const Language = require('../../../app/models/Language');
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/video-processing';

const dataNoiseReduction = [
  {
    id: 'no',
    name: 'Không chọn giải thuật nhiễu',
  },
  {
    id: 'deep',
    name: 'Giải thuật DeepFilterNet',
  },
  {
    id: 'noise',
    name: 'Giải thuật NoiseReduce',
  },
];
// lexrank, textrank, lsa, luhn, random, reduction, edmundson, kl
const dataTextSummarization = [
  {
    id: 'lexrank',
    name: 'Giải thuật Lexrank',
  },
  {
    id: 'textrank',
    name: 'Giải thuật Textrank',
  },
  {
    id: 'luhn',
    name: 'Giải thuật LSA ',
  },
  {
    id: 'random',
    name: 'Giải thuật Random ',
  },
  {
    id: 'reduction',
    name: 'Giải thuật Reduction ',
  },
  {
    id: 'edmundson',
    name: 'Giải thuật Edmundson ',
  },
  {
    id: 'kl',
    name: 'Giải thuật KL-sum',
  },
  {
    id: 'no',
    name: 'Không chọn giải thuật',
  },
];
const dataLanguage = [
  {
    id: 'vi',
    name: 'Tiếng Việt'
  },
  {
    id: 'en',
    name: 'Tiếng Anh'
  },
]
async function seedModels() {
  try {
    await NoiseReduction.deleteMany();
    await TextSummarization.deleteMany(); 
    await Language.deleteMany(); 

    const createdNoiseReductions = await NoiseReduction.create(dataNoiseReduction); 
    const createdTextSummarizations = await TextSummarization.create(dataTextSummarization);
    const createdLanguage = await Language.create(dataLanguage);

    console.log('seeder created successfully');
    process.exit(0); 
  } catch (error) {
    console.error('seeder created fail', error);
    process.exit(1); 
  }
}

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Mongoose successfully!');
    seedModels(); 
  })
  .catch((error) => console.error('error', error));
