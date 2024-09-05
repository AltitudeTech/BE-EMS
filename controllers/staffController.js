const { Staff } = require("../models");

const { staffValidationSchema } = require("../validations/staffFormValidation");

class StaffClass {
  // Route to display all staff
  staffDisplay = async (req, res) => {
    try {
      const staffList = await Staff.findAll({});
      return res.json(staffList);
    } catch (error) {
      console.error("Error fetching staff:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Route to count number of staff
  staffCount = async (req, res) => {
    try {
      const staffCount = await Staff.findAndCountAll({});
      return res.json([staffCount.count]);
    } catch (error) {
      console.error("Error counting staff:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  // Method to create staff's details
  createStaff = async (req, res) => {
    try {
      // Destructure the request body
      const {
        surname,
        name,
        email,
        mobile,
        gender,
        specialization,
        role,
        organization,
      } = req.body;

      // Validate input using Joi schema
      const { error } = staffValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      // Check if staff already exists by mobile number
      const staffExist = await Staff.findOne({
        where: { mobile },
      });

      if (staffExist) {
        return res.status(409).json({ message: "Staff already exists" });
      }

      // Create new staff if they don't exist
      const newStaff = await Staff.create(req.body);

      // Respond with the newly created staff data
      return res.status(201).json(newStaff);
    } catch (error) {
      // Handle server errors
      console.error("Error creating staff:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  // Method for editing staff details
  staffEdit = async (req, res) => {
    try {
      // Destructure the request body
      const {
        surname,
        name,
        email,
        mobile,
        gender,
        specialization,
        role,
        organization,
      } = req.body;

      // Validate inputs (assuming similar validation exists for updates)
      const { error } = staffValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      // Check if staff exists
      const staffExist = await Staff.findOne({
        where: { mobile },
      });

      if (staffExist) {
        await Staff.update(
          {
            surname,
            name,
            email,
            gender,
            specialization,
            role,
            organization,
          },
          {
            where: { mobile },
          }
        );
        return res.status(200).json({ message: "Staff details updated" });
      } else {
        return res.status(404).json({ message: "Staff not found" });
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Method to delete staff
  deleteStaff = async (req, res) => {
    try {
      const { mobile } = req.body;

      // Check if staff exists
      const staffExist = await Staff.findOne({
        where: { mobile },
      });

      if (staffExist) {
        await Staff.destroy({
          where: { mobile },
        });
        return res.status(200).json({ message: "Staff deleted successfully" });
      } else {
        return res.status(404).json({ message: "Staff not found" });
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

// Create instance of the StaffClass
const staffClass = new StaffClass();

module.exports = {
  staffClass,
};
