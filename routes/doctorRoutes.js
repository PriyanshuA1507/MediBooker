// Doctor Routes
// Developed by Priyanshu for MediBooker

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getalldoctors,
  getnotdoctors,
  applyfordoctor,
  acceptdoctor,
  rejectdoctor,
  deletedoctor,
} = require("../controllers/doctorController");

// Fetch all verified doctors (public)
router.get("/getalldoctors", getalldoctors);

// Fetch pending doctor applications (Admin only)
router.get("/getnotdoctors", auth, getnotdoctors);

// Apply for doctor verification (User)
router.post("/applyfordoctor", auth, applyfordoctor);

// Delete doctor (Admin)
router.put("/deletedoctor", auth, deletedoctor);

// Accept doctor application (Admin)
router.put("/acceptdoctor", auth, acceptdoctor);

// Reject doctor application (Admin)
router.put("/rejectdoctor", auth, rejectdoctor);

module.exports = router;
