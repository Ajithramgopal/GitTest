const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

console.log("-- Payment Routes Loaded --");

router.post("/", paymentController.createPayment);
router.get("/", paymentController.getAllPayments);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
