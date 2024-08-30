const { DataTypes } = require('sequelize');
const sequelize = require('../config/staffConfig.js');

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
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Staff;
