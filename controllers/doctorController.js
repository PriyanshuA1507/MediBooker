// Doctor Controller
// Developed by Priyanshu for MediBooker

const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");

// 🩺 Get all verified doctors
const getAllDoctors = async (req, res) => {
  try {
    const filter = req.locals
      ? { isDoctor: true, _id: { $ne: req.locals } }
      : { isDoctor: true };

    const doctors = await Doctor.find(filter).populate("userId");

    if (!doctors || doctors.length === 0)
      return res.status(404).json({ message: "No doctors found." });

    return res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ message: "Unable to fetch doctors." });
  }
};

// 🧑‍⚕️ Get all pending doctor applications
const getNotDoctors = async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ isDoctor: false })
      .find({ _id: { $ne: req.locals } })
      .populate("userId");

    if (!pendingDoctors || pendingDoctors.length === 0)
      return res.status(404).json({ message: "No pending applications found." });

    return res.status(200).json(pendingDoctors);
  } catch (error) {
    console.error("Error fetching pending doctors:", error);
    return res.status(500).json({ message: "Unable to fetch pending applications." });
  }
};

// 📝 Apply to become a doctor
const applyForDoctor = async (req, res) => {
  try {
    const existingApplication = await Doctor.findOne({ userId: req.locals });
    if (existingApplication) {
      return res.status(400).json({ message: "Application already exists." });
    }

    const newDoctor = new Doctor({ ...req.body.formDetails, userId: req.locals });
    await newDoctor.save();

    return res.status(201).json({ message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error submitting doctor application:", error);
    return res.status(500).json({ message: "Unable to submit application." });
  }
};

// ✅ Accept doctor application
const acceptDoctor = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Missing doctor ID." });

    await User.findByIdAndUpdate(id, { isDoctor: true, status: "accepted" });
    await Doctor.findOneAndUpdate({ userId: id }, { isDoctor: true });

    const notification = new Notification({
      userId: id,
      content: "🎉 Congratulations! Your doctor application has been accepted.",
    });
    await notification.save();

    return res.status(200).json({ message: "Application accepted and notification sent." });
  } catch (error) {
    console.error("Error accepting doctor:", error);
    return res.status(500).json({ message: "Error while accepting doctor application." });
  }
};

// ❌ Reject doctor application
const rejectDoctor = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Missing doctor ID." });

    await User.findByIdAndUpdate(id, { isDoctor: false, status: "rejected" });
    await Doctor.findOneAndDelete({ userId: id });

    const notification = new Notification({
      userId: id,
      content: "❌ Sorry, your doctor application has been rejected.",
    });
    await notification.save();

    return res.status(200).json({ message: "Application rejected and notification sent." });
  } catch (error) {
    console.error("Error rejecting doctor:", error);
    return res.status(500).json({ message: "Error while rejecting doctor application." });
  }
};

// 🗑️ Delete doctor account (admin)
const deleteDoctor = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "Missing user ID." });

    await User.findByIdAndUpdate(userId, { isDoctor: false });
    await Doctor.findOneAndDelete({ userId });
    await Appointment.deleteMany({ userId });

    return res.status(200).json({ message: "Doctor deleted successfully." });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return res.status(500).json({ message: "Unable to delete doctor." });
  }
};

module.exports = {
  getAllDoctors,
  getNotDoctors,
  applyForDoctor,
  acceptDoctor,
  rejectDoctor,
  deleteDoctor,
};
