const Entry = require("../models/entryModel");
const Comment = require("../models/commentModel")

const getEntries = async (req, res) => {
     try {
          //filter entries by user that posted (for like profile maybe)
          // const entry = await Entry.find({ user_username: req.user.username });
          //gets all entries with creator attached
          const entry = await Entry.find({}).sort({ createdAt: -1 });
          res.status(200).json(entry);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const getSoloEntry = async (req, res) => {
     try {
          const entry = await Entry.findById(req.params.id);
          if (!entry) {
               res.status(404);
               throw Error("Entry not found");
          }
          res.status(200).json(entry);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};
const createEntry = async (req, res) => {
     try {
          const entry = await Entry.create({
               start: req.body.start,
               end: req.body.end,
               text: req.body.text,
               user_id: req.user._id,
               user_username: req.user.username,
               user_profilePicture: req.user.profilePicture
          });
          res.status(200).json(entry);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const createComment = async (req,res) => {
     try {
          const comment = await Comment.create({
               text: req.body.text,
               user_id: req.user._id,
               user_username: req.user.username,
               post_id: req.body.postId
          });
          // console.log(req.body)
          res.status(200).json(comment);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
}

const getComments = async (req, res) => {
     try {
          //filter entries by user that posted (for like profile maybe)
          // const entry = await Entry.find({ user_username: req.user.username });
          //gets all entries with creator attached
          const comment = await Comment.find({post_id: req.params.id}).sort({ createdAt: -1 });
          res.status(200).json(comment);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};


const updateEntry = async (req, res) => {
     try {
          const entry = await Entry.findById(req.params.id);
          if (!entry) {
               res.status(404);
               throw Error("Entry not found");
          }
          const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, {
               text: req.body.text,
          });
          res.status(200).json({ message: `updated ${req.params.id}` });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};
const deleteEntry = async (req, res) => {
     try {
          const entry = await Entry.findById(req.params.id);
          if (!entry) {
               res.status(404);
               throw Error("Entry not found");
          }
          const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
          res.status(200).json(deletedEntry);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const updateLikes = async (req, res) => {
     try {
          const entry = await Entry.findById(req.params.id);
          if (!entry) {
               res.status(404);
               throw Error("Entry not found");
          }
          const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, {
               $push: { likes: req.user._id },
          });
          if (updatedEntry.likes.includes(req.user._id)) {
               await Entry.findByIdAndUpdate(req.params.id, {
                    $pull: { likes: req.user._id },
               });
          }

          res.status(200).json({ message: `liked ${req.params.id}` });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const updatePostPicture = async (req,res) => {
     try {
          
          const entry = await Entry.findById({user_id: req.user.id})
          if(!entry){
               throw Error("User not found")
          }

          const updateEntry = await entry.updateOne({profilePicture: req.user.profilePicture})
          res.status(200).json(result.secure_url)
        } catch (error) {
          res.status(400).json({error: error})
        }
}

module.exports = {
     getEntries,
     getSoloEntry,
     createEntry,
     deleteEntry,
     updateEntry,
     updateLikes,
     createComment,
     getComments,
     updatePostPicture
};
