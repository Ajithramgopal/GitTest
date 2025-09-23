const con = require("../config/db");

const AnnouncementModel = {
  // Create Announcement
  create: (data, callback) => {
    const sql = `INSERT INTO announcements (
      title, message, postedBy, audienceType, targetBlock, targetFlat,
      attach, status, sendPush, userId, createdBy, createdDate,
      updatedBy, updatedDate, organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.title,
        data.message,
        data.postedBy,
        data.audienceType,
        data.targetBlock,
        data.targetFlat,
        data.attach,
        data.status,
        data.sendPush,
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

  // Get all Announcements
  findAll: (callback) => {
    const sql = `SELECT * FROM announcements`;
    con.query(sql, callback);
  },

  // Update Announcement
  update: (announceId, data, callback) => {
    const sql = `UPDATE announcements SET
      title=?, message=?, postedBy=?, audienceType=?, targetBlock=?,
      targetFlat=?, attach=?, status=?, sendPush=?, updatedBy=?, updatedDate=?
      WHERE announceId=?`;

    con.query(
      sql,
      [
        data.title,
        data.message,
        data.postedBy,
        data.audienceType,
        data.targetBlock,
        data.targetFlat,
        data.attach,
        data.status,
        data.sendPush,
        data.updatedBy || null,
        data.updatedDate || null,
        announceId,
      ],
      callback
    );
  },

  // Delete Announcement
  delete: (announceId, callback) => {
    const sql = `DELETE FROM announcements WHERE announceId = ?`;
    con.query(sql, [announceId], callback);
  },
};

module.exports = AnnouncementModel;
