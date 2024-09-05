module.exports = (sequelize, DataTypes) => {
  const permissions = ["view", "edit", "create", "delete"];
  const entities = [
    "organization",
    "appointment",
    "patient",
    "staff",
    "account",
  ];

  const Permission = sequelize.define(
    "Permission",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM(...permissions),
        allowNull: false,
      },
      entity: {
        type: DataTypes.ENUM(...entities),
        allowNull: false,
      },
    },
    {
      tableName: "permissions",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  // Define associations
  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: models.RolePermission,
      as: "roles",
      foreignKey: "permission_id",
    });
  };

  return Permission;
};
