const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

console.log("--Maintenances Routes Working--");

router.post("/", maintenanceController.createMaintenance);
router.get("/", maintenanceController.getAllMaintenance);
router.put("/:id", maintenanceController.updateMaintenance);
router.delete("/:id", maintenanceController.deleteMaintenance);

module.exports = router;
