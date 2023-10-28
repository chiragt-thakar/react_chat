const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      msg: { type: String, 
        required: true
     },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
       required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
