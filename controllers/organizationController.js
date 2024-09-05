const { Organization } = require("../models");
const {
  organizationSchema,
} = require("../validations/organizationFormValidation");

class OrganizationClass {
  // Create a new organization
  createOrganization = async (req, res) => {
    try {
      const { error } = organizationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const newOrganization = await Organization.create(req.body);
      return res.status(201).json(newOrganization);
    } catch (err) {
      console.error("Error creating organization:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Get all organizations
  getOrganizations = async (req, res) => {
    try {
      const organizations = await Organization.findAll();
      return res.status(200).json(organizations);
    } catch (err) {
      console.error("Error fetching organizations:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Update an organization by ID
  updateOrganization = async (req, res) => {
    try {
      const { id } = req.params;
      const { error } = organizationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const [updated] = await Organization.update(req.body, {
        where: { id },
      });

      if (updated) {
        const updatedOrganization = await Organization.findByPk(id);
        return res.status(200).json(updatedOrganization);
      }

      return res.status(404).json({ message: "Organization not found" });
    } catch (err) {
      console.error("Error updating organization:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Delete an organization by ID
  deleteOrganization = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Organization.destroy({
        where: { id },
      });

      if (deleted) {
        return res.status(204).json();
      }

      return res.status(404).json({ message: "Organization not found" });
    } catch (err) {
      console.error("Error deleting organization:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
// creat instance of the patient class
const organizationClass = new OrganizationClass();

//export class
module.exports = {
  organizationClass,
};

// module.exports = {
//   createOrganization,
//   getOrganizations,
//   updateOrganization,
//   deleteOrganization,
// };
