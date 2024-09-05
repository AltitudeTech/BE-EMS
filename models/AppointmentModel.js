module.exports = (sequelize, DataTypes) => {
  // Define the Appointment model
  const Appointment = sequelize.define(
    "Appointment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      appointment_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      underscored: true, // Use snake_case for column names
    }
  );

  // Define associations
  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Patient, {
      foreignKey: "patient_id",
      as: "patient",
    });
    Appointment.belongsTo(models.Staff, {
      foreignKey: "doctor_id",
      as: "doctor",
    });
    Appointment.belongsTo(models.Organization, {
      foreignKey: "organization_id",
      as: "organization",
    });
  };

  return Appointment;
};
