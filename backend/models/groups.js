const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = new Schema({
    grpName: { type: String, unique: true, required: true },
    description: { type: String },
}, {
    timestamps: true,
});





const Groups = mongoose.model('Group', groupSchema);
module.exports = Groups;
