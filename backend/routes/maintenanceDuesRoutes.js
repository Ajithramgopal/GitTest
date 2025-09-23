const express = require("express");
const router = express.Router();
const duesController = require("../controllers/maintenanceDuesController");

console.log("-- Maintenance Dues Routes Loaded --");

router.post("/", duesController.createDue);
router.get("/", duesController.getAllDues);
router.put("/:id", duesController.updateDue);
router.delete("/:id", duesController.deleteDue);

module.exports = router;
