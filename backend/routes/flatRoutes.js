const express = require("express");
const router = express.Router();
const flatController = require("../controllers/flatController ");

console.log("--Flat Routes Working--");
// POST → create user
router.post("/", flatController.createFlat);

router.get("/", flatController.getAllFlats);

router.delete("/:id", flatController.deleteFlat);

router.put("/:id", flatController.updateFlat);

module.exports = router;
