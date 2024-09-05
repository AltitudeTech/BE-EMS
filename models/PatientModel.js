module.exports = (sequelize, DataTypes) => {
  // Define the Patient model
  const Patient = sequelize.define(
    "Patient",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUIDs
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "patient",
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Additional fields can be added here
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      underscored: true, // Use snake_case for column names
    }
  );

  // Define associations
  Patient.associate = (models) => {
    Patient.belongsTo(models.Organization, {
      foreignKey: "org_id",
      as: "organization", // Alias for the relation
    });
    Patient.hasMany(models.Appointment, {
      foreignKey: "patient_id",
      as: "appointments", // Alias for the relation
    });
  };

  return Patient;
};
