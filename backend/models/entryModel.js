const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
     {
          start: { type: String, required: true },
          end: { type: String, required: true },
          text: { type: String, required: true },
          likes: { type: Array, requried: true, default: [] },
          liked: { type: Boolean, required: true, default: false },
          user_id: { type: String, requried: true },
          user_username: {type: String, required: true},
          user_profilePicture: {type: String, required: true}
     },
     { timestamps: true }
);

module.exports = mongoose.model("entries", entrySchema);
