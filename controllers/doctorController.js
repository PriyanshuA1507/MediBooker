const applyForDoctor = async (req, res) => {
  try {
    const exists = await Doctor.findOne({ userId: req.locals });
    if (exists) {
      return res.status(400).json({ message: "Application already submitted." });
    }

    const newDoctor = new Doctor({
      specialization: req.body.specialization,
      experience: req.body.experience,
      fees: req.body.fees,
      userId: req.locals,
    });

    await newDoctor.save();

    return res.status(201).json({ message: "Doctor application submitted successfully." });
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({ message: "Unable to submit application." });
  }
};
