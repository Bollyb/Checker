const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  logoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Brand', brandSchema);
