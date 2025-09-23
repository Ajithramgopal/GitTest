const con = require("../config/db");

const OrgModel = {
  // ✅ Create organization
  create: (data, callback) => {
    const sql = `
      INSERT INTO organization 
      (orgName, status, startDate, endDate, userId, createdBy, createdDate)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;
    con.query(
      sql,
      [
        data.orgName,
        data.status,
        data.startDate,
        data.endDate,
        data.userId,
        data.createdBy,
      ],
      callback
    );
  },

  // ✅ Get all organizations
  findAll: (callback) => {
    const sql = `SELECT * FROM organization`;
    con.query(sql, callback);
  },

  // ✅ Update organization
  update: (orgId, data, callback) => {
    const sql = `
      UPDATE organization 
      SET orgName = ?, status = ?, startDate = ?, endDate = ? 
      WHERE orgId = ?
    `;
    con.query(
      sql,
      [data.orgName, data.status, data.startDate, data.endDate, orgId], // ✅ use orgId param
      callback
    );
  },

  // ✅ Delete organization
  delete: (orgId, callback) => {
    const sql = `DELETE FROM organization WHERE orgId = ?`;
    console.log("Deleting orgId:", orgId);
    con.query(sql, [orgId], callback);
  },
};

module.exports = OrgModel;
