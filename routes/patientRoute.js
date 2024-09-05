const express = require("express");
const patient = require("../controllers/patientController");
const upload = require("../middleware/multerMiddleware");

//create express router
const router = express.Router();

//create routes
router.route("/list").get(patient.patientClass.patientdisplay);
router.route("/create").post(patient.patientClass.createPatient);
router.route("/count").post(patient.patientClass.patientCount);
router.route("/edit").put(patient.patientClass.patientEdit);
router.route("/delete").delete(patient.patientClass.deletePatient);
// router.route('/upload').put(upload.single('file'), patient.patientClass.profilePics)
// router.route('/photo').post(patient.patientClass.displayPics)

module.exports = router;
