const BlockModel = require("../models/blockModels");

exports.createBlock = (request, response) => {
  BlockModel.create(request.body, (err, result) => {
    if (err) {
      return response.status(500).json({ error: err.message });
    }
    response.status(200).json({ message: "Block Created Successfully" });
  });
};

exports.createManyBlock = (request, response) => {
  BlockModel.insertMany(request.body, (err, result) => {
    if (err) {
      return response.status(500).json({ error: err.message });
    }
    response.status(200).json({ message: "Block Created Successfully" });
  });
};
// Get all blocks

exports.getAllBlocks = (request, response) => {
  BlockModel.findAll((err, results) => {
    if (err) {
      return response.status(500).json({ error: err.message });
    }
    response.status(200).json(results); // ✅ use response
  });
};

exports.deleteBlock = (req, res) => {
  const blockId = req.params.id;
  console.log("Controller received ID:", blockId);
  BlockModel.delete(blockId, (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({
        message: "Error deleting block",
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Block not found" });
    }

    res.status(200).json({ message: "Block deleted successfully" });
  });
};

// PUT /api/block/:id

exports.updateBlock = (request, response) => {
  const blockId = request.params.id;
  const updatedData = request.body;

  // console.log("blockId -Cont", blockId);
  // console.log("updatedData -Cont", updatedData);

  BlockModel.update(blockId, updatedData, (err, results) => {
    if (err) {
      console.error("Error updating block:", err);
      return response.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return response.status(404).json({ message: "Block not found" });
    }

    response.json({ message: "Block updated successfully" });
  });
};
