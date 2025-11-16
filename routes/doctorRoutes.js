const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAllDoctors,
  getNotDoctors,
  applyForDoctor,
  acceptDoctor,
  rejectDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

// PUBLIC ROUTES
router.get("/getalldoctors", getAllDoctors);

// ADMIN ROUTES
router.get("/getnotdoctors", auth, getNotDoctors);
router.put("/acceptdoctor", auth, acceptDoctor);
router.put("/rejectdoctor", auth, rejectDoctor);
router.delete("/deletedoctor/:id", auth, deleteDoctor);  // 🔥 FIXED ROUTE

// DOCTOR APPLY
router.post("/applyfordoctor", auth, applyForDoctor);

module.exports = router;
