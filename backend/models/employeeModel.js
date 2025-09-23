const con = require("../config/db");

const EmployeeModel = {
  // Create Employee
  create: (data, callback) => {
    const sql = `INSERT INTO employees (
      name, dob, age, mob, adhaar, block, flat,
      country, state, city, address, upload,
      userId, createdBy, createdDate, organizationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        data.name,
        data.dob,
        data.age,
        data.mob,
        data.adhaar,
        data.block,
        data.flat,
        data.country,
        data.state,
        data.city,
        data.address,
        data.upload,
        data.userId,
        data.createdBy,
        data.createdDate,
        data.organizationId,
      ],
      callback
    );
  },

  // Get All Employees
  findAll: (callback) => {
    const sql = `SELECT * FROM employees`;
    con.query(sql, callback);
  },

  // Update Employee
  update: (empId, data, callback) => {
    const sql = `UPDATE employees SET
      name=?, dob=?, age=?, mob=?, adhaar=?, block=?, flat=?,
      country=?, state=?, city=?, address=?, upload=?, updatedBy=?, updatedDate=?
      WHERE empId=?`;

    con.query(
      sql,
      [
        data.name,
        data.dob,
        data.age,
        data.mob,
        data.adhaar,
        data.block,
        data.flat,
        data.country,
        data.state,
        data.city,
        data.address,
        data.upload,
        data.updatedBy || null,
        data.updatedDate || null,
        empId,
      ],
      callback
    );
  },

  // Delete Employee
  delete: (empId, callback) => {
    const sql = `DELETE FROM employees WHERE empId = ?`;
    con.query(sql, [empId], callback);
  },
};

module.exports = EmployeeModel;
