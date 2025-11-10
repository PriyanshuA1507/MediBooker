// User Routes
// Developed by Priyanshu for MediBooker

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getUser,
  getAllUsers,
  loginUser,
  registerUser,
  updateProfile,
  deleteUser,
} = require("../controllers/userController");

// 📝 Register a new user
router.post("/register", registerUser);

// 🔐 Login existing user
router.post("/login", loginUser);

// 👤 Get single user details
router.get("/getuser/:id", auth, getUser);

// 👥 Get all users (Admin only)
router.get("/getallusers", auth, getAllUsers);

// ✏️ Update profile (User)
router.put("/updateprofile", auth, updateProfile);

// 🗑️ Delete user (Admin/User)
router.delete("/deleteuser", auth, deleteUser);

module.exports = router;
