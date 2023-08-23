const express = require("express");
const commentController = require("../controllers/comment_controller");
const router = express.Router()
router.post("/",commentController.createComment);
router.get("/",commentController.showAll)

module.exports = router;