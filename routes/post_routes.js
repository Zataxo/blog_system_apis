const express = require("express");
const checkAuthMiddleWare = require("../middleware/check_auth");
const postController = require("../controllers/post_controller");
const router = express.Router();
router.post("/", checkAuthMiddleWare.checkAuth, postController.createPost);
router.get("/:id", postController.showOne);
router.get("/", postController.showAll);
router.patch("/:id", checkAuthMiddleWare.checkAuth, postController.updatePost);
router.delete(
  "/:id&:userId",
  checkAuthMiddleWare.checkAuth,
  postController.deletePost
); // /:id/:userId or /:id&:userId
module.exports = router;
