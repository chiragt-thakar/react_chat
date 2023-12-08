const express = require('express');
const messageModel = require('../models/messageModel');
const router = express.Router();

router.post('/getmessage', async (req, res, next) => {
    try {
        const { from, to } = req.body;
    console.log("to is ", to);
        const messages = await messageModel.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
    
        const projectedMessages = messages.map((msgs) => {
          return {
            fromSelf: msgs.sender.toString() === from,
            message: msgs.message.msg,
          };
        });
        res.json(projectedMessages);
      } catch (ex) {
        next(ex);
      }
  });
module.exports = router;