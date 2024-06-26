// folder: models
// filename: messageModel.js
const mongoose = require("mongoose");

// 	Schema for messages with fields for name, message, and status (regular, pending, in process, completed). Includes timestamps.
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true, enum: ['regular', 'pending', 'in process', 'completed'], default: 'regular' },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
