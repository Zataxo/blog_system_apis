const express = require("express");
const categoryController = require("../controllers/category_controller");
const router = express.Router();
router.post("/", categoryController.createCategory);
router.get("/", categoryController.showAll);

module.exports = router;
