// Appointment Controller
// Developed by Priyanshu for MediBooker

const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

// 📦 Fetch all appointments for user/doctor
const getAllAppointments = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
        }
      : {};

    const appointments = await Appointment.find(keyword)
      .populate("doctorId")
      .populate("userId");

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found." });
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Unable to fetch appointments." });
  }
};

// 🩺 Book a new appointment
const bookAppointment = async (req, res) => {
  try {
    const { date, time, doctorId, doctorname } = req.body;

    if (!date || !time || !doctorId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newAppointment = new Appointment({
      date,
      time,
      doctorId,
      userId: req.locals,
    });

    // Notification for user
    const userNotification = new Notification({
      userId: req.locals,
      content: `You booked an appointment with Dr. ${doctorname} for ${date} at ${time}.`,
    });
    await userNotification.save();

    // Notification for doctor
    const user = await User.findById(req.locals);
    const doctorNotification = new Notification({
      userId: doctorId,
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${date} at ${time}.`,
    });
    await doctorNotification.save();

    const result = await newAppointment.save();
    return res.status(201).json({
      message: "Appointment booked successfully.",
      appointment: result,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ message: "Unable to book appointment." });
  }
};

// ✅ Mark appointment as completed
const markAppointmentCompleted = async (req, res) => {
  try {
    const { appointid, doctorId, doctorname } = req.body;

    if (!appointid || !doctorId || !doctorname) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointid,
      { status: "Completed" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // Notify patient
    const userNotification = new Notification({
      userId: req.locals,
      content: `Your appointment with ${doctorname} has been marked as completed.`,
    });
    await userNotification.save();

    // Notify doctor
    const user = await User.findById(req.locals);
    const doctorNotification = new Notification({
      userId: doctorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed.`,
    });
    await doctorNotification.save();

    return res.status(200).json({ message: "Appointment marked as completed." });
  } catch (error) {
    console.error("Error completing appointment:", error);
    return res.status(500).json({ message: "Unable to complete appointment." });
  }
};

module.exports = {
  getAllAppointments,
  bookAppointment,
  markAppointmentCompleted,
};
