const express = require("express");
const router = express.Router();
const facilityMasterController = require("../controllers/facilityMasterController");

console.log("--Facility Master Routes Working--");
router.post("/", facilityMasterController.createFacilityMaster);
router.get("/", facilityMasterController.getAllFacilityMasters);
router.put("/:id", facilityMasterController.updateFacilityMaster);
router.delete("/:id", facilityMasterController.deleteFacilityMaster);

module.exports = router;
