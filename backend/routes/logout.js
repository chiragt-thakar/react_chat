const express = require('express');
const router = express.Router();


router.get('/logout',(req,res)=>{
    res.clearCookie('authToken');
    console.log("gggggggggggggggg")
     //console.log(req.cookies.authToken)
    res.send("cookiecleared")
});
module.exports=router;