const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig.js');
const { uniqueId } = require('lodash');

const Staff = sequelize.define('Staff', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, //Validate Mail format
        }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique : true,
        validate: {
            isNumeric: true, // Validates its a number val
            len: [10, 15],  // Set Lenght
        }
    },
    practice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    educationalQualification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    organization: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY, // Uses Date format  YYYY-MM-DD
        allowNull: false,
        validate: {
            isDate: true, // Validate it uses the date format
        }
    },
});

module.exports = Staff;
