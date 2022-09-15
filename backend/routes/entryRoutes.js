const router = require("express").Router();
const protect = require("../middleware/protect");
const {
     getEntries,
     getSoloEntry,
     createEntry,
     deleteEntry,
     updateEntry,
     updateLikes,
     createComment,
     getComments,
     updatePostPicture
} = require("../controllers/entryControllers");

router.use(protect);
router.get("/", getEntries);
router.get("/:id", getSoloEntry);
router.get("/comment/:id", getComments)
router.post("/", createEntry);
router.post("/:id", createComment)
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);
router.put("/:id/likes", updateLikes);
router.put("/:id/avatar", updatePostPicture);


module.exports = router;
