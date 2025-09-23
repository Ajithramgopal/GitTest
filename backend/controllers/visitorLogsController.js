const VisitorLogsModel = require("../models/visitorLogsModel");

// Create Visitor Log
exports.createVisitorLog = (req, res) => {
  console.log("req", req);
  VisitorLogsModel.create(req.body, (err, result) => {
    if (err) {
      console.error("Error creating visitor log:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Visitor log created successfully" });
  });
};

// Get All Visitor Logs
exports.getAllVisitorLogs = (req, res) => {
  VisitorLogsModel.findAll((err, results) => {
    if (err) {
      console.error("Error fetching visitor logs:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Update Visitor Log
exports.updateVisitorLog = (req, res) => {
  const visitorLogsId = req.params.id;
  VisitorLogsModel.update(visitorLogsId, req.body, (err, result) => {
    if (err) {
      console.error("Error updating visitor log:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Visitor log not found" });
    }
    res.json({ message: "Visitor log updated successfully" });
  });
};

// Delete Visitor Log
exports.deleteVisitorLog = (req, res) => {
  const visitorLogsId = req.params.id;
  VisitorLogsModel.delete(visitorLogsId, (err, result) => {
    if (err) {
      console.error("Error deleting visitor log:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Visitor log not found" });
    }
    res.json({ message: "Visitor log deleted successfully" });
  });
};
