const ChatMessage = require('../models/ChatMessage');
// If OpenAI, you can call API inside controller

exports.sendMessage = async (req, res) => {
  try {
    const { userId, message, response } = req.body; 
    const chat = await ChatMessage.create({ userId, message, response });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};





exports.getChatsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ msg: 'userId is required' });

    const chats = await ChatMessage.findAll({
      where: { userId },
      order: [['createdAt', 'ASC']]
    });

    res.json(chats);
  } catch (err) {
    console.error("GET CHATS ERROR:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};
