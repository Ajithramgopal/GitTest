const con = require("../config/db");

const ResidentModel = {
  // Create Resident
  create: (data, callback) => {
    const sql = `INSERT INTO residents 
      (blockId, flatId, name, phone, email, aadhar, role, startDate, endDate, status, attach,
       userId, createdBy, createdDate, updatedBy, updatedDate, organizationId) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.blockId,
        data.flatId,
        data.name,
        data.phone,
        data.email,
        data.aadhar,
        data.role,
        data.startDate,
        data.endDate,
        data.status,
        data.attach,
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

  // Get All Residents
  findAll: (callback) => {
    con.query("SELECT * FROM residents", callback);
  },

  // Update Resident
  update: (residentId, data, callback) => {
    const sql = `UPDATE residents SET 
      blockId=?, flatId=?, name=?, phone=?, email=?, aadhar=?, role=?, 
      startDate=?, endDate=?, status=?, attach=?, 
      updatedBy=?, updatedDate=? 
      WHERE residentId=?`;

    con.query(
      sql,
      [
        data.blockId,
        data.flatId,
        data.name,
        data.phone,
        data.email,
        data.aadhar,
        data.role,
        data.startDate,
        data.endDate,
        data.status,
        data.attach,
        data.updatedBy,
        data.updatedDate,
        residentId,
      ],
      callback
    );
  },

  // Delete Resident
  delete: (residentId, callback) => {
    con.query(
      "DELETE FROM residents WHERE residentId=?",
      [residentId],
      callback
    );
  },
};

module.exports = ResidentModel;
