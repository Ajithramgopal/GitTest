const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "society", // make sure this DB exists
  port: 3306,
});

// Secret key for JWT
const SECRET_KEY = "ajithram@96";

// ✅ Register API
app.post("/users", (req, res) => {
  const {
    userName,
    status,
    password,
    conPassword,
    email,
    mobile,
    role,
    block,
    flat,
    createdBy,
    organizationId,
  } = req.body;
  //console.log("req.body", req.body);
  // hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `INSERT INTO users 
    (userName, status, password, conPassword, email, mobile, role, block, flat, createdBy, createdDate, organizationId) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`;

  db.query(
    sql,
    [
      userName,
      status,
      hashedPassword,
      conPassword, // ❌ this is dangerous, better not store plain confirm password (remove later)
      email,
      mobile,
      role,
      block,
      flat,
      createdBy,
      organizationId,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ User registered successfully" });
    }
  );
});

// ✅ Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  //console.log("login", req.body);
  // hash password
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
   // console.log("err", err);
   // console.log("results", results);
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = results[0];

    // check password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    // create token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "✅ Login success", token });
  });
});

// ✅ Protected route
app.get("/profile", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    res.json({ message: "Profile Data", user: decoded });
  });
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
