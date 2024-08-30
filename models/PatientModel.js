const Sequelize = require("sequelize");
const db = require("../config/dbConfig");
const { allow } = require("joi");

const Patient = db.define("Patient", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncreament: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  mobile_no: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  education_qualification: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  organization: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  picture: {
    type: Sequelize.STRING, // Store the picture URL or path
    allowNull: true,
  },
});

module.exports = Patient;
