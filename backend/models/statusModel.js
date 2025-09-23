const con = require("../config/db");

const StatusModel = {
  create: (data, callback) => {
    const sql = `INSERT INTO status 
      (name, code, description, userId, createdBy, createdDate, updatedBy, updatedDate, organizationId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.name,
        data.code,
        data.description,
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
    con.query("SELECT * FROM status", callback);
  },

  update: (statusId, data, callback) => {
    const sql = `UPDATE status SET 
      name=?, code=?, description=?, updatedBy=?, updatedDate=? 
      WHERE statusId=?`;

    con.query(
      sql,
      [
        data.name,
        data.code,
        data.description,
        data.updatedBy,
        data.updatedDate,
        statusId,
      ],
      callback
    );
  },

  delete: (statusId, callback) => {
    con.query("DELETE FROM status WHERE statusId=?", [statusId], callback);
  },
};

module.exports = StatusModel;
