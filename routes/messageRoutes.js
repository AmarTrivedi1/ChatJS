//folder: routes
//filename: messageRoutes.js
const express = require('express');
const router = express.Router();
const { getMessages, createMessage } = require('../controllers/messageController');

// Route to fetch messages using getMessages controller.
router.get('/', getMessages);

// Route to create a new message using createMessage controller.
router.post('/', createMessage);

module.exports = router;
