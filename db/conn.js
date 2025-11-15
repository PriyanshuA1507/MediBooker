const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./db/conn");
connectDB();  // IMPORTANT!!!

// Import Routes
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointRoutes");
const notificationRoutes = require("./routes/notificationRouter");
