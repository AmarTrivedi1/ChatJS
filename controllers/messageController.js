const Message = require('../models/messageModel');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 }).limit(50); // Retrieves the last 50 messages
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required." });
    }
    const newMessage = new Message({ name, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
