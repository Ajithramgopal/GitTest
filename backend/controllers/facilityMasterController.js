const FacilityMaster = require("../models/FacilityMasterModel");

// Create
exports.createFacilityMaster = (req, res) => {
  console.log("createFacilityMaster req", req);
  console.log("createFacilityMaster res", res);
  FacilityMaster.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Facility Master created successfully" });
  });
};

// Get All
exports.getAllFacilityMasters = (req, res) => {
  FacilityMaster.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Update
exports.updateFacilityMaster = (req, res) => {
  // console.log("req.params.id", req.params.id);
  FacilityMaster.update(req.params.id, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Facility Master not found" });
    res.json({ message: "Facility Master updated successfully" });
  });
};

// Delete
exports.deleteFacilityMaster = (req, res) => {
  FacilityMaster.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Facility Master not found" });
    res.json({ message: "Facility Master deleted successfully" });
  });
};
