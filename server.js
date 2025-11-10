// MediBooker Server
// Developed by Priyanshu Bhardwaj

const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
require("./db/conn"); // Unified db connection file

// Import Routes
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/notification", notificationRoutes);

// Serve React Frontend (production)
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error. Please try again later.",
  });
});

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ MediBooker Server is running on port ${PORT}`);
});
