const FlatModel = require("../models/flatModels");

// ✅ Create Flat
exports.createFlat = (req, res) => {
  FlatModel.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Flat created successfully" });
  });
};

// ✅ Get All Flats
exports.getAllFlats = (req, res) => {
  FlatModel.findAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// ✅ Delete Flat
exports.deleteFlat = (req, res) => {
  const flatId = req.params.id;
  console.log("Controller received ID:", flatId);

  FlatModel.delete(flatId, (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({
        message: "Error deleting flat",
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.status(200).json({ message: "Flat deleted successfully" });
  });
};

// ✅ Update Flat
exports.updateFlat = (req, res) => {
  const flatId = req.params.id;
  const updatedData = req.body;

  FlatModel.update(flatId, updatedData, (err, results) => {
    if (err) {
      console.error("Error updating flat:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.json({ message: "Flat updated successfully" });
  });
};
