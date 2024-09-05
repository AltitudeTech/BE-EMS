module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      // This model can be empty or include extra fields if needed
    },
    {
      tableName: "role_permissions",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  return RolePermission;
};
