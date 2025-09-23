const con = require("../config/db");

const PaymentModel = {
  create: (data, callback) => {
    const sql = `INSERT INTO payments 
      (residentId, dueId, amount, paymentMethod, transactionId, status, paidAt, receiptUrl,
       userId, createdBy, createdDate, updatedBy, updatedDate, organizationId) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.residentId,
        data.dueId,
        data.amount,
        data.paymentMethod,
        data.transactionId,
        data.status,
        data.paidAt,
        data.receiptUrl,
        data.userId,
        data.createdBy,
        data.createdDate,
        data.updatedBy || null,
        data.updatedDate || null,
        data.organizationId,
      ],
      callback
    );
  },

  findAll: (callback) => {
    con.query("SELECT * FROM payments", callback);
  },

  update: (paymentId, data, callback) => {
    const sql = `UPDATE payments SET 
      amount=?, paymentMethod=?, status=?, paidAt=?, receiptUrl=?, 
      updatedBy=?, updatedDate=? 
      WHERE paymentId=?`;

    con.query(
      sql,
      [
        data.amount,
        data.paymentMethod,
        data.status,
        data.paidAt,
        data.receiptUrl,
        data.updatedBy,
        data.updatedDate,
        paymentId,
      ],
      callback
    );
  },

  delete: (paymentId, callback) => {
    con.query("DELETE FROM payments WHERE paymentId=?", [paymentId], callback);
  },
};

module.exports = PaymentModel;
