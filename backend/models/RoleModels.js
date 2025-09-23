const con = require("../config/db");

const RoleModels = {
  // ✅ Create Role
  create: (data, callback) => {
    const sql = `INSERT INTO roles (
      role, userId, createdBy, createdDate, updatedBy, updatedDate, organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.role,
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

  // ✅ Get all Role
  findAll: (callback) => {
    const sql = `SELECT * FROM roles`;
    con.query(sql, callback);
  },

  // ✅ Update Role
  update: (roleId, data, callback) => {
    const sql = `UPDATE roles SET
      role = ?
      WHERE roleId = ?`;

    con.query(sql, [data.role, roleId], callback);
  },

  // ✅ Delete Flat
  delete: (roleId, callback) => {
    const sql = `DELETE FROM roles WHERE roleId = ?`;
    con.query(sql, [roleId], callback);
  },
};

module.exports = RoleModels;
