const con = require("../config/db");

const VisitorModel = {
  // Create Visitor
  create: (data, callback) => {
    const sql = `INSERT INTO visitors (
      residentId, name, mobile, purpose, preApprovedBy,
      expectedTime, entryTime, exitTime, status, entryMethod,
      otpCode, qrCodeurl, vehicleNo, photoUrl, notes,
      verifiedBy, userId, createdBy, createdDate,
     organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.residentId,
        data.name,
        data.mobile,
        data.purpose,
        data.preApprovedBy,
        data.expectedTime,
        data.entryTime,
        data.exitTime,
        data.status,
        data.entryMethod,
        data.otpCode,
        data.qrCodeurl,
        data.vehicleNo,
        data.photoUrl,
        data.notes,
        data.verifiedBy,
        data.userId,
        data.createdBy,
        data.createdDate,
        data.organizationId,
      ],
      callback
    );
  },

  // Get all Visitors
  findAll: (callback) => {
    const sql = `SELECT * FROM visitors`;
    con.query(sql, callback);
  },

  // Update Visitor
  update: (visitId, data, callback) => {
    const sql = `UPDATE visitors SET
      residentId=?, name=?, mobile=?, purpose=?, preApprovedBy=?,
      expectedTime=?, entryTime=?, exitTime=?, status=?, entryMethod=?,
      otpCode=?, qrCodeurl=?, vehicleNo=?, photoUrl=?, notes=?,
      verifiedBy=?, updatedBy=?, updatedDate=?
      WHERE visitId=?`;

    con.query(
      sql,
      [
        data.residentId,
        data.name,
        data.mobile,
        data.purpose,
        data.preApprovedBy,
        data.expectedTime,
        data.entryTime,
        data.exitTime,
        data.status,
        data.entryMethod,
        data.otpCode,
        data.qrCodeurl,
        data.vehicleNo,
        data.photoUrl,
        data.notes,
        data.verifiedBy,
        data.updatedBy || null,
        data.updatedDate || null,
        visitId,
      ],
      callback
    );
  },

  // Delete Visitor
  delete: (visitId, callback) => {
    const sql = `DELETE FROM visitors WHERE visitId = ?`;
    con.query(sql, [visitId], callback);
  },
};

module.exports = VisitorModel;
