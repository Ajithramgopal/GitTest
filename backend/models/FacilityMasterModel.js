const con = require("../config/db");

const FacilityMasterModel = {
  // Create
  create: (data, callback) => {
    // console.log("data", data);
    // console.log("callback", callback);
    const sql = `INSERT INTO facilityMaster (
      name, \`desc\`, availableSlot, priceSlot, isPaid, attach, status,
      userId, createdBy, createdDate, organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.name,
        data.desc,
        data.availableSlot,
        data.priceSlot,
        data.isPaid,
        data.attach,
        data.status,
        data.userId,
        data.createdBy,
        data.createdDate,
        data.organizationId,
      ],
      callback
    );
  },

  // Get All
  findAll: (callback) => {
    con.query("SELECT * FROM facilityMaster", callback);
  },

  // Update
  update: (facilityMasId, data, callback) => {
    // console.log("update id", facilityMasId);
    // console.log("data", data);
    const sql = `UPDATE facilityMaster SET
      name=?, \`desc\`=?, availableSlot=?, priceSlot=?, isPaid=?, attach=?, status=?,
      updatedBy=?, updatedDate=? WHERE facilityMasId=?`;

    con.query(
      sql,
      [
        data.name,
        data.desc,
        data.availableSlot,
        data.priceSlot,
        data.isPaid,
        data.attach,
        data.status,
        data.updatedBy || null,
        data.updatedDate || null,
        facilityMasId,
      ],
      callback
    );
  },

  // Delete
  delete: (id, callback) => {
    con.query(
      "DELETE FROM facilityMaster WHERE facilityMasId=?",
      [id],
      callback
    );
  },
};

module.exports = FacilityMasterModel;
