const express = require("express");
const organization = require("../controllers/organizationController");
const router = express.Router();

// Create a new organization
router.post("/create", organization.organizationClass.createOrganization);

// Get all organizations
router.get("/list", organization.organizationClass.getOrganizations);

// Update an organization by ID
router.put("/update/:id", organization.organizationClass.updateOrganization);

// Delete an organization by ID
router.delete("/delete/:id", organization.organizationClass.deleteOrganization);

module.exports = router;
