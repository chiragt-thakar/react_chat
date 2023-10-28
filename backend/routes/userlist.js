const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/userlist', async (req, res) => {
    try {
        let u_list = await User.find({}, 'userName');
        console.log('User Names:', u_list);
        res.send(u_list);
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;