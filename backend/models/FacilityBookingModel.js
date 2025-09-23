const con = require("../config/db");

const FacilityBookingModel = {
  create: (data, callback) => {
    const sql = `INSERT INTO facilityBooking (
      residentId, facilityId, bookingDate, timeSlot, paymentStatus, notes,
      status, approvedBy, userId, createdBy, createdDate, organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.residentId,
        data.facilityId,
        data.bookingDate,
        data.timeSlot,
        data.paymentStatus,
        data.notes,
        data.status,
        data.approvedBy,
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
    con.query("SELECT * FROM facilityBooking", callback);
  },

  update: (id, data, callback) => {
    const sql = `UPDATE facilityBooking SET
      residentId=?, facilityId=?, bookingDate=?, timeSlot=?, paymentStatus=?, notes=?, 
      status=?, approvedBy=?, updatedBy=?, updatedDate=? WHERE facilityBookId=?`;

    con.query(
      sql,
      [
        data.residentId,
        data.facilityId,
        data.bookingDate,
        data.timeSlot,
        data.paymentStatus,
        data.notes,
        data.status,
        data.approvedBy,
        data.updatedBy || null,
        data.updatedDate || null,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    con.query(
      "DELETE FROM facilityBooking WHERE facilityBookId=?",
      [id],
      callback
    );
  },
};

module.exports = FacilityBookingModel;
