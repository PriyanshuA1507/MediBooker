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

router.get("/getalldoctors", getAllDoctors);
router.get("/getnotdoctors", auth, getNotDoctors);
router.post("/applyfordoctor", auth, applyForDoctor);
router.delete("/deletedoctor", auth, deleteDoctor);
router.put("/acceptdoctor", auth, acceptDoctor);
router.put("/rejectdoctor", auth, rejectDoctor);

module.exports = router;
