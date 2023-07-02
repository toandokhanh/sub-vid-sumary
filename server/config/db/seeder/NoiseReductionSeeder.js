const NoiseReduction = require('../../../app/models/NoiseReduction');
const { Seeder } = require('mongoose-data-seed');


const data = [
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

  class NoiseReductionSeeder extends Seeder{
    async shouldRun() {
      const count = await NoiseReduction.countDocuments().exec();
      return count === 0;
    }
  
    async run() {
      return NoiseReduction.create(data);
    }
  }
  
  module.exports = NoiseReductionSeeder;
  // export default NoiseReductionSeeder;