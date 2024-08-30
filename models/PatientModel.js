const Sequelize = require("sequelize");
const db = require("../config/dbConfig");

const Patient = db.define("Patient", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Corrected typo
  },
  firstname: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true, // Ensures the field is not empty
    },
  },
  surname: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Ensures email is unique
    validate: {
      isEmail: true, // Ensures the value is a valid email format
    },
  },
  mobile_no: {
    type: Sequelize.STRING(15),
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true, // Ensures only numeric values
    },
  },
  gender: {
    type: Sequelize.ENUM("Male", "Female", "Other"), // Restrict values to specific options
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATEONLY, // Use DATEONLY if only the date part is relevant
    allowNull: false,
    validate: {
      isDate: true, // Ensures the value is a valid date
    },
  },
  address: {
    type: Sequelize.TEXT, // Use TEXT for longer strings
    allowNull: false,
  },
  education_qualification: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  organization: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  picture: {
    type: Sequelize.STRING, // Stores the picture URL or path
    allowNull: true,
    validate: {
      isUrl: true, // Ensures the value is a valid URL if provided
    },
  },
});

module.exports = Patient;
