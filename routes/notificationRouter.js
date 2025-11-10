// Notification Routes
// Developed by Priyanshu for MediBooker

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { getallnotifs } = require("../controllers/notificationController");

// Fetch all notifications for logged-in user
router.get("/getallnotifs", auth, getallnotifs);

module.exports = router;
