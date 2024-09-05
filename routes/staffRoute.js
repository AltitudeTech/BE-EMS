const express = require("express");

const staff = require("../controllers/staffController");
const router = express.Router();

// Routes for staff
router.route("/list").get(staff.staffClass.staffDisplay);
router.route("/count").get(staff.staffClass.staffCount); // Changed to GET for consistency
router.route("/create").post(staff.staffClass.createStaff);
router.route("/edit").put(staff.staffClass.staffEdit);
router.route("/delete").delete(staff.staffClass.deleteStaff);

module.exports = router;
