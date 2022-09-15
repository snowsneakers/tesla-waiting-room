const mongoose = require("mongoose");

const commentModel = new mongoose.Schema(
     {
          text: { type: String, required: true },
          likes: { type: Array, requried: true, default: [] },
          liked: { type: Boolean, required: true, default: false },
          user_id: { type: String, requried: true },
          user_username: {type: String, required: true},
          post_id: {type: String, required: true}
     },
     { timestamps: true }
);

module.exports = mongoose.model("comment", commentModel);