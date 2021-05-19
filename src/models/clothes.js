const mongoose = require('mongoose');

const clotheSchema = new mongoose.Schema({
  type: { type: String, required: true },
  color: { type: String },
});
const clotheModel = mongoose.model('clothe', clotheSchema);

module.exports = clotheModel;
