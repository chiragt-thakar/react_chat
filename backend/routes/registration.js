const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();


// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies)
};

router.post('/registration', async function (req, res) {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({ error: "Sorry a user with this name already exists" })
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            userName: req.body.name,
            email:req.body.email,
            password: secPass,

            role: req.body.role
        });
        // console.log("this is user")
        // console.log(user)
        // const data = {
        //     user: {
        //       id: user.id,
        //       name:user.userName,
        //       //email:user.email,

        //     }
        //   }
          //const authtoken = jwt.sign(data, JWT_SECRET);
        ////console.log(user);
        res.send(true)

    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send(errors);
        }
        if (error.code === 11000) {
            return res.status(400).send("Name is alrady use");
        }
        res.status(500).send("Something went wrong");


    }

})
module.exports = router;