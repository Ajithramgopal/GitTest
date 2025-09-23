const express = require("express");
const router = express.Router();
const orgController = require("../controllers/orgController");

console.log("--Org Routes Working--");
// POST → create organization
router.post("/", orgController.createOrg);

// GET → list all organizations
router.get("/", orgController.getAllOrgs);

// DELETE → delete organization by id
router.delete("/:id", orgController.deleteOrg);

router.put("/:id", orgController.updateOrg);

module.exports = router;
