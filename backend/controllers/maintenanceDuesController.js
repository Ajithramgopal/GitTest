const MaintenanceDuesModel = require("../models/maintenanceDuesModel");

exports.createDue = (req, res) => {
  MaintenanceDuesModel.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Maintenance due created successfully" });
  });
};

exports.getAllDues = (req, res) => {
  MaintenanceDuesModel.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.updateDue = (req, res) => {
  MaintenanceDuesModel.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Maintenance due not found" });
    res.json({ message: "Maintenance due updated successfully" });
  });
};

exports.deleteDue = (req, res) => {
  MaintenanceDuesModel.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Maintenance due not found" });
    res.json({ message: "Maintenance due deleted successfully" });
  });
};
