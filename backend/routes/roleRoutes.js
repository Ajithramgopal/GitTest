const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

console.log("--Role Routes Working--");

router.post("/", roleController.createRole);

router.get("/", roleController.getAllRoles);

router.delete("/:id", roleController.deleteRole);

router.put("/:id", roleController.updateRole);

module.exports = router;
