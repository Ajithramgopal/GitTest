const express = require("express");
const router = express.Router();
const blockController = require("../controllers/blockController");

console.log("--Block Routes Working--");

router.get("/", blockController.getAllBlocks);

router.post("/", blockController.createBlock);

router.post("/bulk", blockController.createManyBlock);

router.delete("/:id", blockController.deleteBlock);

router.put("/:id", blockController.updateBlock);

module.exports = router;
