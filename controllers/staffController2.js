const { Staff } = require("../models");
const { staffValidationSchema } = require("../validations/staffFormValidation");
const { Op } = require("sequelize"); // Import Sequelize operators

class StaffClass {
  // Route to display all staff with pagination
  staffDisplay = async (req, res) => {
    try {
      const { page = 1, size = 10 } = req.query; // Default pagination parameters
      const limit = parseInt(size);
      const offset = (parseInt(page) - 1) * limit;

      const { count, rows: staffList } = await Staff.findAndCountAll({
        limit,
        offset,
      });

      return res.status(200).json({
        success: true,
        message: "Staff fetched successfully",
        data: staffList,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
        },
      });
    } catch (error) {
      console.error("Error fetching staff:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  // Route to count number of staff
  staffCount = async (req, res) => {
    try {
      const staffCount = await Staff.count({});
      return res.status(200).json({
        success: true,
        message: "Staff count fetched successfully",
        data: { count: staffCount },
      });
    } catch (error) {
      console.error("Error counting staff:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error", error });
    }
  };

  // Method to create staff's details
  createStaff = async (req, res) => {
    try {
      const { error } = staffValidationSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const { mobile } = req.body;

      const staffExist = await Staff.findOne({ where: { mobile } });

      if (staffExist) {
        return res
          .status(409)
          .json({ success: false, message: "Staff already exists" });
      }

      const newStaff = await Staff.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Staff created successfully",
        data: newStaff,
      });
    } catch (error) {
      console.error("Error creating staff:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error", error });
    }
  };

  // Method for editing staff details
  staffEdit = async (req, res) => {
    try {
      const { error } = staffValidationSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const { mobile } = req.body;

      const staffExist = await Staff.findOne({ where: { mobile } });

      if (staffExist) {
        await Staff.update(req.body, { where: { mobile } });
        return res.status(200).json({
          success: true,
          message: "Staff details updated successfully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Staff not found" });
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  // Method to delete staff
  deleteStaff = async (req, res) => {
    try {
      const { mobile } = req.body;

      const staffExist = await Staff.findOne({ where: { mobile } });

      if (staffExist) {
        await Staff.destroy({ where: { mobile } });
        return res.status(200).json({
          success: true,
          message: "Staff deleted successfully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Staff not found" });
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  // Method to search staff by practice, specialization, email, firstname, or lastname
  searchStaff = async (req, res) => {
    try {
      const { practice, specialization, email, firstname, surname } = req.query; // Use query parameters for search

      // Create a dynamic where clause
      const whereClause = {};
      if (practice) whereClause.practice = practice;
      if (specialization) whereClause.specialization = specialization;
      if (email) whereClause.email = email;
      if (firstname) whereClause.name = { [Op.like]: `%${firstname}%` }; // Search with partial match
      if (surname) whereClause.surname = { [Op.like]: `%${surname}%` }; // Search with partial match

      const staffList = await Staff.findAll({ where: whereClause });
      return res.status(200).json({
        success: true,
        message: "Staff search results fetched successfully",
        data: staffList,
      });
    } catch (error) {
      console.error("Error searching staff:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
}

// Create instance of the StaffClass
const staffClass = new StaffClass();

module.exports = {
  staffClass,
};
