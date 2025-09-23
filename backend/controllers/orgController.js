const OrgModel = require("../models/orgModels");

// ✅ Create Organization
exports.createOrg = (req, res) => {
  OrgModel.create(req.body, (err, result) => {
    if (err) {
      console.error("Error creating org:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Organization created successfully" });
  });
};

// ✅ Get All Organizations
exports.getAllOrgs = (req, res) => {
  OrgModel.findAll((err, results) => {
    if (err) {
      console.error("Error fetching orgs:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// ✅ Delete Organization
exports.deleteOrg = (req, res) => {
  const orgId = req.params.id;
  console.log("Controller received ID:", orgId);

  OrgModel.delete(orgId, (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({
        message: "Error deleting organization",
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({ message: "Organization deleted successfully" });
  });
};

// ✅ Update Organization
exports.updateOrg = (req, res) => {
  const orgId = req.params.id;
  const updatedData = req.body;

  OrgModel.update(orgId, updatedData, (err, results) => {
    if (err) {
      console.error("Error updating org:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({ message: "Organization updated successfully" });
  });
};
