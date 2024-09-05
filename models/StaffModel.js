module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    "Staff",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      educationalQualification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING(100),
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
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "staff",
      },
    },
    {
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  // Define associations here if needed
  Staff.associate = (models) => {
    Staff.belongsTo(models.Organization, { foreignKey: "org_id" });
    Staff.hasMany(models.Appointment, { foreignKey: "doctor_id" });
  };

  return Staff;
};
