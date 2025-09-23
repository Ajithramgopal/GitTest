const con = require("../config/db");

const MaintenanceDuesModel = {
  create: (data, callback) => {
    const sql = `INSERT INTO maintenancedues 
      (residentId, amount, dueMonth, dueDate, userId, createdBy, createdDate, updatedBy, updatedDate, organizationId) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.residentId,
        data.amount,
        data.dueMonth,
        data.dueDate,
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
    con.query("SELECT * FROM maintenancedues", callback);
  },

  update: (dueId, data, callback) => {
    const sql = `UPDATE maintenancedues SET 
      amount=?, dueMonth=?, dueDate=?, updatedBy=?, updatedDate=? 
      WHERE dueId=?`;

    con.query(
      sql,
      [
        data.amount,
        data.dueMonth,
        data.dueDate,
        data.updatedBy,
        data.updatedDate,
        dueId,
      ],
      callback
    );
  },

  delete: (dueId, callback) => {
    con.query("DELETE FROM maintenancedues WHERE dueId=?", [dueId], callback);
  },
};

module.exports = MaintenanceDuesModel;
