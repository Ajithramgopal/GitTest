const con = require("../config/db");

const VisitorLogsModel = {
  // Create Visitor Log
  create: (data, callback) => {
    const sql = `INSERT INTO visitorLogs (
      visitorId, guardId, entryTime, exitTime, verifiyType, notes,
      createdBy, createdDate,  organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.visitorId,
        data.guardId,
        data.entryTime,
        data.exitTime,
        data.verifiyType,
        data.notes,
        data.createdBy,
        data.createdDate,
        data.organizationId,
      ],
      callback
    );
  },

  // Get all Visitor Logs
  findAll: (callback) => {
    const sql = `SELECT * FROM visitorLogs`;
    con.query(sql, callback);
  },

  // Update Visitor Log
  update: (visitorLogsId, data, callback) => {
    const sql = `UPDATE visitorLogs SET
      visitorId=?, guardId=?, entryTime=?, exitTime=?, verifiyType=?, notes=?,
      updatedBy=?, updatedDate=? WHERE visitorLogsId=?`;

    con.query(
      sql,
      [
        data.visitorId,
        data.guardId,
        data.entryTime,
        data.exitTime,
        data.verifiyType,
        data.notes,
        data.updatedBy || null,
        data.updatedDate || null,
        visitorLogsId,
      ],
      callback
    );
  },

  // Delete Visitor Log
  delete: (visitorLogsId, callback) => {
    const sql = `DELETE FROM visitorLogs WHERE visitorLogsId = ?`;
    con.query(sql, [visitorLogsId], callback);
  },
};

module.exports = VisitorLogsModel;
