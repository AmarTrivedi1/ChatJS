//folder: controllers
//filename: messageController.js
const Message = require('../models/messageModel');

// Fetches the last 50 messages from the database, sorts them by creation date, and sends them back as a JSON response.
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 }).limit(50); // Retrieves the last 50 messages
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 	Creates a new message with required fields 'name' and 'message'; saves it to the database.
exports.createMessage = async (req, res) => {
  try {
    const { name, message, status } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required." });
    }
    const newMessage = new Message({ name, message, status });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
