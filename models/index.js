const { DataTypes } = require("sequelize");

const sequelize = require("../config/dbConfig");

// Import models
const Patient = require("./PatientModel")(sequelize, DataTypes);
const Appointment = require("./AppointmentModel")(sequelize, DataTypes);
const Organization = require("./OrganizationModel")(sequelize, DataTypes);
const Staff = require("./StaffModel")(sequelize, DataTypes);
// const Setting = require("./SettingModel")(sequelize, DataTypes);
// const Role = require("./RoleModel")(sequelize, DataTypes);
// const Permission = require("./PermissionModel")(sequelize, DataTypes);
// const RolePermission = require("./RolePermissionModel")(sequelize, DataTypes);

// const setUpAssociation = require("./associationSetup");

const db = {
  sequelize,
  Patient,
  Organization,
  Staff,
  Appointment,
  // Setting,
};

// Export the db object containing Sequelize instance and all models
module.exports = db;

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define associations
// Role.associate({ Permission, RolePermission });
// Permission.associate({ Role, RolePermission });
