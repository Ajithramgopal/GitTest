const con = require("../config/db");

const FlatModel = {
  // ✅ Create Flat
  create: (data, callback) => {
    const sql = `INSERT INTO flat (
      blockName, flatNo, flatName, ownerName, mobile,
      userId, createdBy, createdDate, updatedBy, updatedDate, organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.blockName,
        data.flatNo,
        data.flatName,
        data.ownerName,
        data.mobile,
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

  // ✅ Get all Flats
  findAll: (callback) => {
    const sql = `SELECT * FROM flat`;
    con.query(sql, callback);
  },

  // ✅ Update Flat
  update: (flatId, data, callback) => {
    const sql = `UPDATE flat SET
      blockName = ?, 
      flatNo = ?, 
      flatName = ?, 
      ownerName = ?, 
      mobile = ?, 
      updatedBy = ?, 
      updatedDate = ?
      WHERE flatId = ?`;

    con.query(
      sql,
      [
        data.blockName,
        data.flatNo,
        data.flatName,
        data.ownerName,
        data.mobile,
        data.updatedBy || null,
        data.updatedDate || null,
        flatId,
      ],
      callback
    );
  },

  // ✅ Delete Flat
  delete: (flatId, callback) => {
    const sql = `DELETE FROM flat WHERE flatId = ?`;
    con.query(sql, [flatId], callback);
  },
};

module.exports = FlatModel;
