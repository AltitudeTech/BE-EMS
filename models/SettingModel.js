const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const roles = [
  "admin",
  "doctor",
  "nurse",
  "radiology",
  "laboratory",
  "pharmacy",
  "finance",
];
const permissions = ["view", "edit", "create", "delete"];
const entities = ["organization", "appointment", "patient", "staff", "account"];

const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Permission = sequelize.define("Permission", {
  action: {
    type: DataTypes.ENUM(...permissions),
    allowNull: false,
  },
  entity: {
    type: DataTypes.ENUM(...entities),
    allowNull: false,
  },
});

const RolePermission = sequelize.define("RolePermission", {});

Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });

module.exports = { Role, Permission, RolePermission };
