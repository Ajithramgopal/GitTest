const PaymentModel = require("../models/paymentModel");

exports.createPayment = (req, res) => {
  PaymentModel.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Payment created successfully" });
  });
};

exports.getAllPayments = (req, res) => {
  PaymentModel.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.updatePayment = (req, res) => {
  PaymentModel.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment updated successfully" });
  });
};

exports.deletePayment = (req, res) => {
  PaymentModel.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted successfully" });
  });
};
