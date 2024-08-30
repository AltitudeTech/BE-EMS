//import the required dependencies
const express = require("express");
const db = require("./config/dbConfig");
require("./models/PatientModel");
const cors = require("cors");
const morgan = require("morgan");

//create express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));
const port = process.env.PORT || 5005;

//route
app.use("/EMS/patients", require("./routes/patientRoute"));
app.use("/EMS/staff", require("./routes/StaffDataController"));

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`app is listening to port ${port}`);
    });
  } catch (error) {}
};

start();
