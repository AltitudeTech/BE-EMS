const express = require("express");

const {
  bookAppointment,
  updateAppointment,
  deleteAppointment,
  getRecentAppointments,
} = require("../controllers/appointmentController");

//  move validation into the controller please
// const appointmentValidation = require("../validations/appointmentValidation");

const router = express.Router();

router.get("/recent", getRecentAppointments);
router.post("/book/:patientId", bookAppointment);
router.put("/update/:appointmentId", updateAppointment);
router.delete("/delete/:appointmentId", deleteAppointment);

module.exports = router;
