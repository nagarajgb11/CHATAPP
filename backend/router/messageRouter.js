const express = require('express');
const { sendMessage,allMessages } = require('../controllers/messageController');

const { protect } = require('../middleware/authMiddleware');

const messageRouter = express.Router();

messageRouter.route('/:chatId').get(protect,allMessages)
messageRouter.route('/').post(protect,sendMessage)

module.exports = messageRouter;  