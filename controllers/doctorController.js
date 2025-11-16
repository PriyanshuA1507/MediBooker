

const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");

// 🩺 Get all verified doctors
// 🩺 Get all verified doctors
const getAllDoctors = async (req, res) => {
  try {
    const filter = { isDoctor: true };

    // Exclude logged-in user (only if needed)
    if (req.locals) {
      filter.userId = { $ne: req.locals };
    }

   const doctors = await Doctor.find({ isDoctor: true })
  .populate("userId", "firstname lastname pic mobile email");


    return res.status(200).json(doctors); // always return array
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ message: "Unable to fetch doctors." });
  }
};


// 🧑‍⚕️ Get all pending doctor applications
const getNotDoctors = async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ isDoctor: false }).populate(
      "userId"
    );

    if (!pendingDoctors || pendingDoctors.length === 0) {
      return res
        .status(404)
        .json({ message: "No pending applications found." });
    }

    return res.status(200).json(pendingDoctors);
  } catch (error) {
    console.error("Error fetching pending doctors:", error);
    return res
      .status(500)
      .json({ message: "Unable to fetch pending applications." });
  }
};

// 📝 Apply to become a doctor
const applyForDoctor = async (req, res) => {
  try {
    const exists = await Doctor.findOne({ userId: req.locals });
    if (exists) {
      return res.status(400).json({ message: "Application already submitted." });
    }

    // Extract fields properly
    const { specialization, experience, fees } = req.body.formDetails;

    const newDoctor = new Doctor({
      specialization,
      experience,
      fees,
      userId: req.locals,
      isDoctor: false,
    });

    await newDoctor.save();

    return res
      .status(201)
      .json({ message: "Doctor application submitted successfully." });
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({ message: "Unable to submit application." });
  }
};

// ✅ Accept doctor application
const acceptDoctor = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.status(400).json({ message: "Doctor user ID missing." });

    await User.findByIdAndUpdate(id, { isDoctor: true, status: "accepted" });
    await Doctor.findOneAndUpdate({ userId: id }, { isDoctor: true });

    await new Notification({
      userId: id,
      content: "🎉 Your doctor application has been accepted.",
    }).save();

    return res
      .status(200)
      .json({ message: "Doctor accepted and notified successfully." });
  } catch (error) {
    console.error("Error accepting doctor:", error);
    return res
      .status(500)
      .json({ message: "Unable to accept doctor application." });
  }
};

// ❌ Reject doctor application
const rejectDoctor = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.status(400).json({ message: "Doctor user ID missing." });

    await User.findByIdAndUpdate(id, {
      isDoctor: false,
      status: "rejected",
    });
    await Doctor.findOneAndDelete({ userId: id });

    await new Notification({
      userId: id,
      content: "❌ Your doctor application has been rejected.",
    }).save();

    return res
      .status(200)
      .json({ message: "Doctor rejected and notified successfully." });
  } catch (error) {
    console.error("Error rejecting doctor:", error);
    return res
      .status(500)
      .json({ message: "Unable to reject doctor application." });
  }
};

// 🗑️ Delete doctor account (Admin)
const deleteDoctor = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.status(400).json({ message: "User ID required." });

    await User.findByIdAndUpdate(userId, { isDoctor: false });
    await Doctor.findOneAndDelete({ userId });
    await Appointment.deleteMany({ userId });

    return res
      .status(200)
      .json({ message: "Doctor deleted successfully." });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return res
      .status(500)
      .json({ message: "Unable to delete doctor." });
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
