// User Routes
// Developed by Priyanshu for MediBooker

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
  deleteuser,
} = require("../controllers/userController");

// Register a new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

// Get single user details
router.get("/getuser/:id", auth, getuser);

// Get all users (Admin only)
router.get("/getallusers", auth, getallusers);

// Update profile (User)
router.put("/updateprofile", auth, updateprofile);

// Delete user (Admin/User)
router.delete("/deleteuser", auth, deleteuser);

module.exports = router;
