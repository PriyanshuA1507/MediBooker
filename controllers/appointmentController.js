// Appointment Controller
// Developed by Priyanshu for MediBooker

const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");

// 📋 Fetch all appointments (User/Doctor/Admin)
const getAllAppointments = async (req, res) => {
  try {
    const userId = req.locals;
    const user = await User.findById(userId);

    let query = {};
    if (user.isDoctor) {
      const doctor = await Doctor.findOne({ userId });
      query = { doctorId: doctor._id };
    } else if (!user.isAdmin) {
      query = { userId };
    }

    const appointments = await Appointment.find(query)
      .populate("doctorId")
      .populate("userId");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Unable to fetch appointments." });
  }
};

// 📅 Book a new appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const appointment = new Appointment({
      doctorId,
      userId: req.locals,
      date,
      time,
      reason,
    });
    await appointment.save();

    res.status(201).json({ message: "Appointment booked successfully." });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Unable to book appointment." });
  }
};

// ✅ Mark appointment as completed
const markAppointmentCompleted = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId)
      return res.status(400).json({ message: "Appointment ID required." });

    await Appointment.findByIdAndUpdate(appointmentId, {
      status: "completed",
    });

    res.status(200).json({ message: "Appointment marked as completed." });
  } catch (error) {
    console.error("Error marking appointment complete:", error);
    res.status(500).json({ message: "Unable to mark appointment as completed." });
  }
};

module.exports = {
  getAllAppointments,
  bookAppointment,
  markAppointmentCompleted,
};
