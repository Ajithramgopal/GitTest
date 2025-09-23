const UserModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Create user
exports.createUser = (req, res) => {
  UserModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "User created successfully", id: result.insertId });
  });
};

// Get all users
exports.getAllUsers = (req, res) => {
  UserModel.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  //  console.log("Controller received ID:", userId); // 👈 check here

  UserModel.del(userId, (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res
        .status(500)
        .json({ message: "Error deleting user", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
};

// PUT /api/users/:id
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  // console.log("userId -Cont", userId);
  // console.log("updatedData -Cont", updatedData);
  UserModel.update(userId, updatedData, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  });
};
exports.getUser = (req, res) => {
  // console.log("req-user", req);
  const { email, password } = req.body; // ✅ extract from request

  UserModel.getLogin(email, (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    //console.log("res-user", user);
    // ✅ check password using bcrypt

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // ✅ create token
    const token = jwt.sign(
      { userId: user.userId, email: user.email }, // match your DB field
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "50m" }
    );

    // ✅ send response once
    res.json({
      message: "✅ Login success",
      token,
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        role: user.role,
        status: user.status,
        block: user.block,
        flat: user.flat,
      },
    });
  });
};
