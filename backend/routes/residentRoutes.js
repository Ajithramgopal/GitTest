const express = require("express");
const router = express.Router();
const residentController = require("../controllers/residentController");

console.log("-- Resident Routes Loaded --");

router.post("/", residentController.createResident);

router.get("/", residentController.getAllResidents);

router.put("/:id", residentController.updateResident);

router.delete("/:id", residentController.deleteResident);

module.exports = router;
