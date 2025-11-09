// User Controller
// Developed by Priyanshu for MediBooker

const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 👤 Get user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Unable to fetch user." });
  }
};

// 👥 Get all users (excluding the logged-in one)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.locals } }).select(
      "-password"
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({ message: "Unable to fetch users." });
  }
};

// 🔐 Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required." });

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    const token = jwt.sign(
      { userId: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return res.status(200).json({
      message: "User logged in successfully.",
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Unable to login user." });
  }
};

// 📝 Register new user
const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, mobile, age, gender, pic } =
      req.body;

    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      mobile,
      age,
      gender,
      pic,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Unable to register user." });
  }
};

// ✏️ Update user profile
const updateProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.locals, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Unable to update user profile." });
  }
};

// 🗑️ Delete user and related data
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.status(400).json({ message: "User ID is required." });

    await User.findByIdAndDelete(userId);
    await Doctor.findOneAndDelete({ userId });
    await Appointment.deleteMany({ userId });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Unable to delete user." });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  loginUser,
  registerUser,
  updateProfile,
  deleteUser,
};
