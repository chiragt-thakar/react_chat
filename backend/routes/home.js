const express = require('express');
const authenticateToken = require('../middelWare/authenticateToken')
const router = express.Router();

const User = require('../models/user')
router.get('/home', authenticateToken,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      //console.log("lllllllllll");

       res.send(user)
      //console.log("htis is about page")
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
  module.exports = router