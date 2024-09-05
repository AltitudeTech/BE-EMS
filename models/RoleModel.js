module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "roles",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  // Define associations
  Role.associate = (models) => {
    Role.belongsToMany(models.Permission, {
      through: models.RolePermission,
      as: "permissions",
      foreignKey: "role_id",
    });
  };

  return Role;
};
