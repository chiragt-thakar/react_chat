const express = require('express');
const groups = require('../models/groups');
const router = express.Router();


router.post('/createGroup', async (req, res, next) => {
    try {
      const { chatroomName, description } = req.body;
      console.log(chatroomName);
      console.log(description);
      const data = await groups.create({
        grpName: chatroomName,
        description: description
        
      });
  
      if (data) return res.json({ msg: "Group added successfully.",err:false });
      // else return res.json({ msg: "Failed to Create Group to the database",err:true });
    } catch (error) {
      console.log("this is error",error);
      if(error.code == 11000)
           res.json({ msg: "Name is alredy taken",err:true });
           
           else return res.json({ msg: "Failed to Create Group to the database",err:true });
    }
  });
module.exports = router;