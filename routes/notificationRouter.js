// Notification Routes
// Developed by Priyanshu for MediBooker

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { getAllNotifications } = require("../controllers/notificationController");

// Fetch all notifications for logged-in user
router.get("/getallnotifs", auth, getAllNotifications);

module.exports = router;
