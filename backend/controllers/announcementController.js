const AnnouncementModel = require("../models/announcementModel");

// Create Announcement
exports.createAnnouncement = (req, res) => {
  AnnouncementModel.create(req.body, (err, result) => {
    if (err) {
      console.error("Error creating announcement:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Announcement created successfully" });
  });
};

// Get All Announcements
exports.getAllAnnouncements = (req, res) => {
  AnnouncementModel.findAll((err, results) => {
    if (err) {
      console.error("Error fetching announcements:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Update Announcement
exports.updateAnnouncement = (req, res) => {
  const announceId = req.params.id;
  AnnouncementModel.update(announceId, req.body, (err, result) => {
    if (err) {
      console.error("Error updating announcement:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json({ message: "Announcement updated successfully" });
  });
};

// Delete Announcement
exports.deleteAnnouncement = (req, res) => {
  const announceId = req.params.id;
  AnnouncementModel.delete(announceId, (err, result) => {
    if (err) {
      console.error("Error deleting announcement:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json({ message: "Announcement deleted successfully" });
  });
};
