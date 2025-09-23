const con = require("../config/db");

const MaintenanceModel = {
  create: (data, callback) => {
    const sql = `INSERT INTO maintenance (
      residentId, block, flat, category, description, attach, status, priority,
      assignedTo, assignedAt, resolvedAt, rating, feedback,
      userId, createdBy, createdDate, organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.residentId,
        data.block,
        data.flat,
        data.category,
        data.description,
        data.attach,
        data.status,
        data.priority,
        data.assignedTo,
        data.assignedAt || null,
        data.resolvedAt || null,
        data.rating,
        data.feedback,
        data.userId,
        data.createdBy,
        data.createdDate,
        data.organizationId,
      ],
      callback
    );
  },

  findAll: (callback) => {
    con.query("SELECT * FROM maintenance", callback);
  },

  update: (id, data, callback) => {
    const sql = `UPDATE maintenance SET
      residentId=?, block=?, flat=?, category=?, description=?, attach=?, status=?, priority=?,
      assignedTo=?, assignedAt=?, resolvedAt=?, rating=?, feedback=?, 
      updatedBy=?, updatedDate=? WHERE maintainId=?`;

    con.query(
      sql,
      [
        data.residentId,
        data.block,
        data.flat,
        data.category,
        data.description,
        data.attach,
        data.status,
        data.priority,
        data.assignedTo,
        data.assignedAt || null,
        data.resolvedAt || null,
        data.rating,
        data.feedback,
        data.updatedBy || null,
        data.updatedDate || null,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    con.query("DELETE FROM maintenance WHERE maintainId=?", [id], callback);
  },
};

module.exports = MaintenanceModel;
