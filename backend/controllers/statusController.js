const StatusModel = require("../models/statusModel");

exports.createStatus = (req, res) => {
  StatusModel.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Status created successfully" });
  });
};

exports.getAllStatus = (req, res) => {
  StatusModel.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.updateStatus = (req, res) => {
  StatusModel.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Status not found" });
    res.json({ message: "Status updated successfully" });
  });
};

exports.deleteStatus = (req, res) => {
  StatusModel.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Status not found" });
    res.json({ message: "Status deleted successfully" });
  });
};
