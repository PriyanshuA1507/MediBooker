// Database Configuration
// Developed by Priyanshu for MediBooker

const mongoose = require("mongoose");
require("dotenv").config();

// ⚙️ Set strict query mode
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
