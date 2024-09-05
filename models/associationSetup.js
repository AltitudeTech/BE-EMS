// const Patient = require("./PatientModel");
// const Appointment = require("./appointmentModel");
// const Organization = require("./organizationModel");
// const Staff = require("./staffModel");

const setUpAssociation = () => {
  Organization.hasMany(Patient, { foreignKey: "org_id" });
  Organization.hasMany(Staff, { foreignKey: "org_id" });
  Organization.hasMany(Appointment, { foreignKey: "org_id" });

  //   Patient.belongsTo(Organization, { foreignKey: "org_id" });
  //   Patient.hasMany(Appointment, { foreignKey: "patient_id" });

  Appointment.belongsTo(Patient, { foreignKey: "patient_id" });
  Appointment.belongsTo(Staff, { foreignKey: "doctor_id" });
  Appointment.belongsTo(Organization, { foreignKey: "org_id" });

  Staff.belongsTo(Organization, { foreignKey: "org_id" });
  Staff.hasMany(Appointment, { foreignKey: "doctor_id" });
};

module.exports = setUpAssociation;
