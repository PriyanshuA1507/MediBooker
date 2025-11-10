// Appointment Routes
// Developed by Priyanshu for MediBooker

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getallappointments,
  bookappointment,
  completed,
} = require("../controllers/appointmentController");

// Fetch all appointments (User/Doctor/Admin)
router.get("/getallappointments", auth, getallappointments);

// Book a new appointment
router.post("/bookappointment", auth, bookappointment);

// Mark appointment as completed
router.put("/completed", auth, completed);

module.exports = router;
