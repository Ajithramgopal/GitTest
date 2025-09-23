const con = require("../config/db");

const CategoryModel = {
  create: (data, callback) => {
    const sql = `INSERT INTO category 
      (name, description, userId, createdBy, createdDate, organizationId)
      VALUES (?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.name,
        data.description,
        data.userId,
        data.createdBy,
        data.createdDate,
        data.organizationId,
      ],
      callback
    );
  },

  findAll: (callback) => {
    con.query("SELECT * FROM category", callback);
  },

  update: (catId, data, callback) => {
    const sql = `UPDATE category SET 
      name=?, description=?, updatedBy=?, updatedDate=? 
      WHERE catId=?`;

    con.query(
      sql,
      [data.name, data.description, data.updatedBy, data.updatedDate, catId],
      callback
    );
  },

  delete: (catId, callback) => {
    con.query("DELETE FROM category WHERE catId=?", [catId], callback);
  },
};

module.exports = CategoryModel;
