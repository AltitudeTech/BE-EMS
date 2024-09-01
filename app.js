// Import the required dependencies
const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");

// Database configuration
const db = require("./config/dbConfig");

// Import models
require("./models/PatientModel");

// Create Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(morgan("tiny"));

// Define the port
const port = process.env.PORT || 5005;

// Schedule tasks to ping the server every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  try {
    const response = await axios.get(
      "https://be-ems-production-2721.up.railway.app/"
    );
    console.log("Ping successful:", response.status);
  } catch (error) {
    console.error("Ping failed:", error.message);
  }
});

// Define routes
app.use("/EMS/patients", require("./routes/patientRoute"));
app.use("/EMS/staff", require("./routes/StaffDataController"));

// Start the server
const startServer = () => {
  try {
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
};

// Initialize the server
startServer();
