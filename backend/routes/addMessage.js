const express = require('express');
const messageModel = require('../models/messageModel');
const router = express.Router();

router.post('/addMessage', async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await messageModel.create({
        message: { msg: message },
        users: [from, to],
        sender: from,
      });
  
      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  });
module.exports = router;