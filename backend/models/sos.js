// backend/models/sos.js
const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SOS', sosSchema);
