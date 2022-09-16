const mongoose = require("mongoose");

const commentModel = new mongoose.Schema(
     {
          text: { type: String, required: true },
          likes: { type: Array, requried: true, default: [] },
          liked: { type: Boolean, required: true, default: false },
          user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          user_username: {type: String, required: true},
          post_id: {type: mongoose.Schema.Types.ObjectId, ref: "Entry"}
     },
     { timestamps: true }
);

module.exports = mongoose.model("comment", commentModel);