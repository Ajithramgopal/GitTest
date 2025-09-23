const Maintenance = require("../models/MaintenanceModel");

exports.createMaintenance = (req, res) => {
  Maintenance.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Maintenance created successfully" });
  });
};

exports.getAllMaintenance = (req, res) => {
  Maintenance.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.updateMaintenance = (req, res) => {
  Maintenance.update(req.params.id, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Maintenance not found" });
    res.json({ message: "Maintenance updated successfully" });
  });
};

exports.deleteMaintenance = (req, res) => {
  Maintenance.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Maintenance not found" });
    res.json({ message: "Maintenance deleted successfully" });
  });
};
