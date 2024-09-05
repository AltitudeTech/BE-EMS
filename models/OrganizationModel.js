module.exports = (sequelize, DataTypes) => {
  // Define the Organization model
  const Organization = sequelize.define(
    "Organization",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      timestamps: false, // No createdAt/updatedAt fields
      underscored: true, // Use snake_case for column names
    }
  );

  // Define associations
  Organization.associate = (models) => {
    Organization.hasMany(models.Patient, {
      foreignKey: "patient_id",
      as: "patients", // Alias for the relation
    });
    Organization.hasMany(models.Staff, {
      foreignKey: "staff_id",
      as: "staffs", // Alias for the relation
    });
    Organization.hasMany(models.Appointment, {
      foreignKey: "appointment_id",
      as: "appointments", // Alias for the relation
    });
  };

  return Organization;
};
