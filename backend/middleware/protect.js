const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
     const { authorization } = req.headers;
     if (!authorization) {
          return res.status(401).json({ error: "No token" });
     }
     const token = authorization.split(" ")[1];
     try {
          const { _id } = jwt.verify(token, process.env.SECRET);
          req.user = await User.findOne({ _id }).select("-password");
          // const { username } = jwt.verify(token, process.env.SECRET);
          // req.user = await User.findOne({ username }).select("username");
          next();
     } catch (error) {
          console.log(error);
          res.status(401).json({ error: "Request is not authorized" });
     }
};

module.exports = protect;
