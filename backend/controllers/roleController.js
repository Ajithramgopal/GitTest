const RoleModel = require("../models/RoleModels");
// ✅ Create Role
exports.createRole = (req, res) => {
  RoleModel.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Flat created successfully" });
  });
};

// ✅ Get All Role
exports.getAllRoles = (req, res) => {
  RoleModel.findAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// ✅ Delete Role
exports.deleteRole = (req, res) => {
  const roleId = req.params.id;
  console.log("Controller received ID:", roleId);

  RoleModel.delete(roleId, (err, result) => {
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

// ✅ Update Role
exports.updateRole = (req, res) => {
  const roleId = req.params.id;
  const updatedData = req.body;

  RoleModel.update(roleId, updatedData, (err, results) => {
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
