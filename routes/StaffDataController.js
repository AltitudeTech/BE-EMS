const express = require("express");
const router = express.Router();
const AdminService = require("../controllers/StaffService.js");

// Create a new staff
router.route("/createStaff").post(async (req, res) => {
  try {
    await AdminService.createStaff(req.body);
    res.status(201).send("Staff created successfully");
  } catch (error) {
    res.status(500).send("Error creating staff: " + error.message);
  }
});

//router.route("/create").post(patient.patientClass.createPatient)

// Update a staff
router.put("/updateStaff", async (req, res) => {
  const { id } = req.query;
  try {
    await AdminService.updateStaff(id, req.body);
    res.status(200).send("Staff updated successfully");
  } catch (error) {
    res.status(500).send("Error updating staff: " + error.message);
  }
});

// Delete a staff
router.delete("/deleteStaff", async (req, res) => {
  const { id } = req.query;
  try {
    await AdminService.deleteStaff(id);
    res.status(200).send("Staff deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting staff: " + error.message);
  }
});

// Search for staff by name, specialization, or practice
router.get("/searchStaff", async (req, res) => {
  const { name, specialization, practice } = req.query;
  try {
    const staff = await AdminService.searchStaff(
      name,
      specialization,
      practice
    );
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send("Error searching staff: " + error.message);
  }
});

module.exports = router;
