const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");

console.log("-- Visitor Routes Working --");

router.post("/", visitorController.createVisitor);

router.get("/", visitorController.getAllVisitors);

router.put("/:id", visitorController.updateVisitor);

router.delete("/:id", visitorController.deleteVisitor);

module.exports = router;
