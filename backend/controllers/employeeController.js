const EmployeeModel = require("../models/employeeModel");

// Create Employee
exports.createEmployee = (req, res) => {
  EmployeeModel.create(req.body, (err, result) => {
    if (err) {
      console.error("Error creating employee:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Employee created successfully" });
  });
};

// Get All Employees
exports.getAllEmployees = (req, res) => {
  EmployeeModel.findAll((err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Update Employee
exports.updateEmployee = (req, res) => {
  const empId = req.params.id;
  EmployeeModel.update(empId, req.body, (err, result) => {
    if (err) {
      console.error("Error updating employee:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully" });
  });
};

// Delete Employee
exports.deleteEmployee = (req, res) => {
  const empId = req.params.id;
  EmployeeModel.delete(empId, (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  });
};
