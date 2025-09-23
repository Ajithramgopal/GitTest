const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

console.log("-- Category Routes Working --");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
