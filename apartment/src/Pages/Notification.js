import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Notification({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch initial notifications
    const userId = 1000;
    axios
      .get(`http://localhost:5000/notifications/${userId}`)
      .then((res) => setNotifications(res.data));

    // Listen for new notifications via socket
    socket.on(`notification_${userId}`, (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off(`notification_${userId}`);
    };
  }, [userId]);

  return (
    <div>
      <h3>🔔 Notifications</h3>
      <ul>
        {notifications.map((n) => (
          <li key={n.id}>
            {n.message}{" "}
            <small>({new Date(n.created_at).toLocaleString()})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
