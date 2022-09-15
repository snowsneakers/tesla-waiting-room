const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
     {
          username: { type: String, required: true, unique: true },
          password: { type: String, required: true },
          profilePicture: { type: String, default: "" },
          bannerPicture: { type: String, default: "" },
          followers: { type: Array, default: [] },
          followings: { type: Array, default: [] },
          aboutMe: { type: String, max: 50 },
          orderDate: { type: String, required: true },
          trim: { type: String, required: true },
          exterior: { type: String, required: true },
          wheels: { type: String, required: true },
          interior: { type: String, required: true },
          fsd: { type: String, required: true },
          location: { type: String, default: "N/A" },
     },
     { timestamps: true }
);

userSchema.statics.signup = async function (
     username,
     password,
     orderDate,
     trim,
     exterior,
     wheels,
     interior,
     fsd,
     location,
     profilePicture
) {
     if (!username || !password || !orderDate) {
          throw Error("All fields must be filled");
     }

     const exists = await this.findOne({ username });
     if (exists) {
          throw Error("Username already exists");
     }

     if (!validator.isStrongPassword(password)) {
          throw Error("Password is not strong enough");
     }

     const hash = await bcrypt.hash(password, 10);

     const user = this.create({
          username,
          password: hash,
          orderDate,
          trim,
          exterior,
          wheels,
          interior,
          fsd,
          location,
          profilePicture: "https://i.stack.imgur.com/IHLNO.jpg"
     });
     return user;
};

userSchema.statics.login = async function (username, password) {
     if (!username || !password) {
          throw Error("All fields must be filled");
     }

     const user = await this.findOne({ username });

     if (!user) {
          throw Error("Incorrect username");
     }

     const compare = await bcrypt.compare(password, user.password);

     if (!compare) {
          throw Error("Incorrect password");
     }

     const verifiedUser = await this.findOne({ username }).select("-password");

     return verifiedUser;
};

module.exports = mongoose.model("user", userSchema);
