const express = require("express");
const postController = require("../controllers/post_controller");
const router = express.Router();
router.post("/",postController.createPost);
router.get("/:id",postController.showOne);
router.get("/",postController.showAll);
router.patch("/:id",postController.updatePost);
router.delete("/:id&:userId",postController.deletePost); // /:id/:userId or /:id&:userId
module.exports = router;