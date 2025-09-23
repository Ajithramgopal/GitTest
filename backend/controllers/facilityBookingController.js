const FacilityBooking = require("../models/FacilityBookingModel");

exports.createFacilityBooking = (req, res) => {
  FacilityBooking.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Facility Booking created successfully" });
  });
};

exports.getAllFacilityBookings = (req, res) => {
  FacilityBooking.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.updateFacilityBooking = (req, res) => {
  FacilityBooking.update(req.params.id, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Facility Booking not found" });
    res.json({ message: "Facility Booking updated successfully" });
  });
};

exports.deleteFacilityBooking = (req, res) => {
  FacilityBooking.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Facility Booking not found" });
    res.json({ message: "Facility Booking deleted successfully" });
  });
};
