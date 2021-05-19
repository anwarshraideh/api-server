const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  type: { type: String, required: true },
  ingrediant: { type: String },
});
const foodModel = mongoose.model('food', foodSchema);

module.exports = foodModel;
