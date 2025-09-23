const express = require("express");
const router = express.Router();
const facilityBookingController = require("../controllers/facilityBookingController");

console.log("--Facility Booking Routes Working--");

router.post("/", facilityBookingController.createFacilityBooking);
router.get("/", facilityBookingController.getAllFacilityBookings);
router.put("/:id", facilityBookingController.updateFacilityBooking);
router.delete("/:id", facilityBookingController.deleteFacilityBooking);

module.exports = router;
