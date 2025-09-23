const express = require("express");
const router = express.Router();
const visitorLogsController = require("../controllers/visitorLogsController");

console.log("-- Visitor Logs Routes Working --");

router.post("/", visitorLogsController.createVisitorLog);

router.get("/", visitorLogsController.getAllVisitorLogs);

router.put("/:id", visitorLogsController.updateVisitorLog);

router.delete("/:id", visitorLogsController.deleteVisitorLog);

module.exports = router;
