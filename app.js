// Import required dependencies
const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");
const swaggerDocs = require("./swagger");
require("dotenv").config();

// Database and models
require("./models");

// Import routes
const organizationRoute = require("./routes/organizationRoute");
const staffRoute = require("./routes/staffRoute");
const patientRoute = require("./routes/patientRoute");
const appointmentRoute = require("./routes/appointmentRoute");
// const settingRoute = require("./routes/settingRoute");

// Configure CORS
const corsOptions = {
  origin: [process.env.CLIENT_URL, "*"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

// Create Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
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
app.use("/api/v1/organization", organizationRoute);
app.use("/api/v1/staff", staffRoute);
app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/appointment", appointmentRoute);
// app.use("/api/v1/setting", settingRoute);

const client_url = process.env.CLIENT_URL || "http://localhost:5005";
swaggerDocs(app, client_url);

// Synchronize models and start the server
const startServer = async () => {
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
