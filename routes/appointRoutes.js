// Appointment Routes
// Developed by Priyanshu for MediBooker

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAllAppointments,
  bookAppointment,
  markAppointmentCompleted,
} = require("../controllers/appointmentController");

// 📋 Fetch all appointments (User / Doctor / Admin)
router.get("/getallappointments", auth, getAllAppointments);

// 🩺 Book a new appointment
router.post("/bookappointment", auth, bookAppointment);

// ✅ Mark appointment as completed
router.put("/completed", auth, markAppointmentCompleted);

module.exports = router;
