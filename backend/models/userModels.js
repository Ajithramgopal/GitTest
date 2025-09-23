const con = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = {
  // Create user
  create: (data, callback) => {
    const sql = `
      INSERT INTO users 
      (userName,status, password, conPassword, email, mobile, role, block, flat, createdby, createddate, organizationid) 
      VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    con.query(
      sql,
      [
        data.userName,
        data.status,
        hashedPassword,
        hashedPassword,
        data.email,
        data.mobile,
        data.role,
        data.block,
        data.flat,
        data.createdby,
        data.organizationid,
      ],
      callback
    );
  },

  // Get all users
  getLogin: (email, callback) => {
    console.log("🔍 Inside model, email:", email);

    const sql = "SELECT * FROM users WHERE email = ?";
    con.query(sql, [email], (err, results) => {
      if (err) {
        console.error("❌ DB error in getLogin:", err);
        return callback(err, null);
      }

      if (results.length === 0) {
        console.warn("⚠️ No user found with email:", email);
        return callback(null, []); // return empty array
      }

      // ✅ return first user
      callback(null, results);
    });
  },

  findAll: (callback) => {
    const sql = `SELECT * FROM users`;
    con.query(sql, callback);
  },

  del: (userId, callback) => {
    const sql = `DELETE FROM users WHERE userId = ?`;
    con.query(sql, [userId], callback);
  },

  update: (userId, data, callback) => {
    // console.log("userId model", userId);
    // console.log("data model", data);
    // console.log("callback model", callback);

    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const sql = `
    UPDATE users 
    SET userName = ?, 
        status = ?, 
        password = ?, 
        conPassword = ?, 
        email = ?, 
        mobile = ?, 
        role = ?, 
        block = ?, 
        flat = ?, 
        updatedBy = ?, 
        updatedDate = NOW(), 
        organizationId = ?
    WHERE userId = ?
  `;

    con.query(
      sql,
      [
        data.userName,
        data.status,
        hashedPassword,
        hashedPassword,
        data.email,
        data.mobile,
        data.role,
        data.block,
        data.flat,
        data.updatedBy,
        data.organizationId,
        userId,
      ],
      callback
    );
  },
};

module.exports = UserModel;
