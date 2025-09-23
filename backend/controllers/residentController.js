const ResidentModel = require("../models/residentModel");

// Create Resident
exports.createResident = (req, res) => {
  ResidentModel.create(req.body, (err) => {
    if (err) {
      console.error("Error creating resident:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Resident created successfully" });
  });
};

// Get All Residents
exports.getAllResidents = (req, res) => {
  ResidentModel.findAll((err, results) => {
    if (err) {
      console.error("Error fetching residents:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Update Resident
exports.updateResident = (req, res) => {
  const residentId = req.params.id;
  ResidentModel.update(residentId, req.body, (err, result) => {
    if (err) {
      console.error("Error updating resident:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Resident not found" });
    }
    res.json({ message: "Resident updated successfully" });
  });
};

// Delete Resident
exports.deleteResident = (req, res) => {
  const residentId = req.params.id;
  ResidentModel.delete(residentId, (err, result) => {
    if (err) {
      console.error("Error deleting resident:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Resident not found" });
    }
    res.json({ message: "Resident deleted successfully" });
  });
};
