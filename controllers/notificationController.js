// Notification Controller
// Developed by Priyanshu for MediBooker

const Notification = require("../models/notificationModel");

// 🔔 Fetch all notifications for the logged-in user
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.locals }).sort({
      createdAt: -1,
    });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: "No notifications found." });
    }

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res
      .status(500)
      .json({ message: "Unable to retrieve notifications." });
  }
};

module.exports = {
  getAllNotifications,
};
