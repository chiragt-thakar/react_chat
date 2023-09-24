
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    // phoneNo: {type: Number},
    password: {type: String, required: true},
    role:{type: String,default:"user"},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const User = mongoose.model('user', userSchema);
module.exports = User;