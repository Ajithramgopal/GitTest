const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "society", // make sure this DB exists
  port: 3306,
});

// Create HTTP & Socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Fetch notifications API
app.get("/notifications/:userId", (req, res) => {
  const { userId } = req.params;
  db.query(
    "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Add notification API
app.post("/notifications", (req, res) => {
  const { user_id, message } = req.body;
  db.query(
    "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
    [user_id, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Emit new notification via socket
      io.emit(`notification_${user_id}`, {
        id: result.insertId,
        user_id,
        message,
      });
      res.json({ success: true, id: result.insertId });
    }
  );
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

server.listen(5000, () => console.log("Server running on port 5000"));
