import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch notifications
  useEffect(() => {
    axios
      .get(`http://localhost:5000/notifications/${userId}`)
      .then((res) => setNotifications(res.data));

    // Real-time socket
    socket.on(`notification_${userId}`, (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off(`notification_${userId}`);
    };
  }, [userId]);

  // Unread count
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // Mark as read when dropdown opens
  const handleOpen = () => {
    setOpen(!open);
    if (!open && unreadCount > 0) {
      axios
        .put(`http://localhost:5000/notifications/read/${userId}`)
        .then(() => {
          setNotifications((prev) =>
            prev.map((n) => ({ ...n, is_read: true }))
          );
        });
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Bell Button */}
      <button
        onClick={handleOpen}
        style={{ fontSize: "24px", position: "relative" }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: "0",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "6px",
            width: "250px",
            maxHeight: "300px",
            overflowY: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {notifications.length === 0 ? (
            <p style={{ padding: "10px" }}>No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  background: n.is_read ? "#fff" : "#f0f8ff",
                }}
              >
                {n.message}
                <br />
                <small>{new Date(n.created_at).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
