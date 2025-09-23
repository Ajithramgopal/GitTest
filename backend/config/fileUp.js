// server.js
import express from "express";
import multer from "multer";
import mysql from "mysql2";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "society", // make sure this DB exists
  port: 3306,
});

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Storage settings for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload API
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;

  db.query("INSERT INTO files (file_path) VALUES (?)", [filePath], (err) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res.json({ message: "File uploaded successfully", path: filePath });
  });
});

app.get("/files", (req, res) => {
  db.query("SELECT * FROM files", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});
app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);
