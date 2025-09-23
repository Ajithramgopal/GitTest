const con = require("../config/db");

const BlockModel = {
  create: (data, callback) => {
    const sql = `INSERT INTO blocks (
      blockName,
      flatCount,
      \`desc\`,   -- desc is a reserved keyword in SQL
      userId,
      createdBy,
      createdDate,
      updatedBy,
      updatedDate,
      organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.blockName,
        data.flatCount,
        data.desc,
        data.userId,
        data.createdBy,
        data.createdDate,
        data.updatedBy,
        data.updatedDate,
        data.organizationId,
      ],
      callback
    );
  },

  insertMany: async (blocks) => {
    const sql = "INSERT INTO Blocks (blockName, flatCount, `desc`) VALUES ?";
    const values = blocks.map((b) => [b.blockName, b.flatCount, b.desc]);
    return new Promise((resolve, reject) => {
      con.query(sql, [values], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  // Get all blocks
  findAll: (callback) => {
    const sql = `SELECT * FROM blocks`;
    con.query(sql, callback);
  },

  //Put
  update: (blockId, data, callback) => {
    console.log("blockId model", blockId);
    console.log("data model", data);
    console.log("callback model", callback);
    const sql = `update blocks set   blockName=?,
      flatCount=?,
      \`desc\`=? where blockId=?`;
    con.query(
      sql,
      [data.blockName, data.flatCount, data.desc, blockId],
      callback
    );
  },

  delete: (blockId, callback) => {
    const sql = `delete from blocks where blockId=?`;
    con.query(sql, [blockId], callback);
  },
};

module.exports = BlockModel;
