const mongoose = require("mongoose");
const db = process.env.MONGO_URI;

const DBconnect = async () => {
     try {
          await mongoose.connect(db, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
          });
          console.log("connect to db");
     } catch (error) {
          console.log(error.message);
          process.exit(1);
     }
};

module.exports = DBconnect;
