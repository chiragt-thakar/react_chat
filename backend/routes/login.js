const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const dotenv = require('dotenv');
// const cookieParser = require('cookie-parser');

//const JWT_SECRET = '3*&^$%4%@@#$%$#)(*&&*()8648962(*'
dotenv.config();
router.post('/login',  async (req, res) => {
    let success = false;
   
    try {
        let user = await User.findOne({ email: req.body.email });
        //console.log(user)
        if (!user) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials11" });
      }
  
      const passwordCompare = await bcrypt.compare(req.body.password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
  
      const data = {
        user: {
          id: user.id,
          name:user.userName
        }
      }
       let token = jwt.sign(data, process.env.TOKEN_SECRET);
       console.log("THe token after login is",token)
      success = true;
      // , { httpOnly: true }
      res.cookie('authToken', token, { httpOnly: true });
      res.json({ message: 'Login successful' });
      //res.redirect('/api/home')
      //res.json({ token })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  });
  module.exports=router;
