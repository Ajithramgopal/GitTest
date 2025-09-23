const VisitorModel = require("../models/visitorModel");

// Create Visitor
exports.createVisitor = (req, res) => {
  VisitorModel.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Visitor created successfully" });
  });
};

// Get All Visitors
exports.getAllVisitors = (req, res) => {
  VisitorModel.findAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Update Visitor
exports.updateVisitor = (req, res) => {
  const visitId = req.params.id;
  VisitorModel.update(visitId, req.body, (err, result) => {
    if (err) {
      console.error("Error updating visitor:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.json({ message: "Visitor updated successfully" });
  });
};

// Delete Visitor
exports.deleteVisitor = (req, res) => {
  const visitId = req.params.id;
  VisitorModel.delete(visitId, (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.json({ message: "Visitor deleted successfully" });
  });
};
