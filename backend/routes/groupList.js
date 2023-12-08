const express = require('express');
const Groups = require('../models/groups');
const router = express.Router();


router.post('/groupList', async (req, res, next) => {
    try {
        let g_list = await Groups.find({}, 'grpName');
       // console.log('User Names:', u_list);
        res.send(g_list);
    } catch (error) {
        console.log(error);
    }
  });
module.exports = router;