const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require("../middleware/cloudinary")

const generateToken = (_id) => {
     // return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
     return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res) => {
     const {
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
     } = req.body;
     try {
          const user = await User.signup(
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
          );
          const token = generateToken(user._id);
          // const token = generateToken(user.username);
          res.status(201).json({ user, token });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const loginUser = async (req, res) => {
     const { username, password } = req.body;
     try {
          const user = await User.login(username, password);
          const token = generateToken(user._id);
          // const token = generateToken(user.username);
          res.status(200).json({ user, token });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const getProfile = async (req, res) => {
     try {
          const user = await User.findOne({ username: req.params.username }).select("-password");
          if (!user) {
               res.status(400);
               throw Error("User not found");
          }
          res.status(200).json(user);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const updateAvatar = async (req, res) => {
     try {
          const result = await cloudinary.uploader.upload(req.body.image, {
            upload_preset: 'tesla_avatar',
            public_id: `${req.user._id}avatar`,
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico']
          }, function(error, result) {if(error){console.log(error)}console.log(result)})
          const user = await User.findById({_id: req.user.id})
          if(!user){
               throw Error("User not found")
          }

          const updateUser = await user.updateOne({profilePicture: result.secure_url})
          res.status(200).json(result.secure_url)
        } catch (error) {
          res.status(400).json({error: error})
        }
};

const getUserByPostId = async (req,res) => {
     try {
          const user = await User.findOne({ _id: req.params.postId }).select("-password");
          if (!user) {
               res.status(400);
               throw Error("User not found");
          }
          res.status(200).json(user);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
}

const followUser = async (req, res) => {
     if(req.body.loggedUserId !== req.body.profileUser){
          try {
               const user = await User.findById(req.body.profileUser)
               const loggedUser = await User.findById(req.body.loggedUserId)
               console.log(loggedUser)
               if(!user.followers.includes(req.body.loggedUserId)){
                    await user.updateOne({$push:{followers: req.body.loggedUserId}})
                    await loggedUser.updateOne({$push: {followings: req.body.profileUser}})
                    res.status(200).json({message: "Followed user"})
               } else if (user.followers.includes(req.body.loggedUserId)){
                    await user.updateOne({$pull:{followers: req.body.loggedUserId}})
                    await loggedUser.updateOne({$pull: {followings: req.body.profileUser}})
                    res.status(200).json({message: "Unfollowed user"})
               } else {
                    res.status(403).json({message: "user already followed"})
               }
          } catch (error) {
               res.status(500).json({error: error.message})
          }
     } else {
          res.status(403).json({message: "cannot follow yourself"})
     }
}

module.exports = {
     loginUser,
     signupUser,
     getProfile,
     updateAvatar,
     getUserByPostId,
     followUser
};
