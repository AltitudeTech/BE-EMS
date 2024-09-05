const {
  Appointment,
  Patient,
  Staff,
  Organization,
  Setting,
} = require("../models");
const { Role, Permission } = require("../models/SettingModel");
const { Op } = require("sequelize");

const getSettings = async (req, res) => {
  //const userId = req.user.id;
  const { userId } = req.params;
  try {
    console.log("here");
    const user = await Patient.findOne({ where: { patient_id: userId } });
    console.log("user", user);
    res.json({
      surname: user.patient_surname + " " + " " + user.patient_name,
      //name: user.name,
      email: user.patient_email,
      mobile: user.patient_mobile,
      //address:user.address,
      //DOB:user.DOB,
      //ZipCode:user.zipCode
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createRolePermission = async (req, res) => {
  const { role, permissions } = req.body;
  const roleInstance = await Role.create({ name: role });

  const permissionInstances = await Permission.findAll({
    where: {
      [Op.or]: permissions.map((p) => ({ action: p.action, entity: p.entity })),
    },
  });

  await roleInstance.addPermissions(permissionInstances);

  res
    .status(201)
    .json({ message: "Role and permissions assigned successfully" });
};

const updatePicture = async (req, res) => {
  // update picture
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;

  if (!bcrypt.compareSync(oldPassword, user.password)) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  user.password = bcrypt.hashSync(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

module.exports = {
  getSettings,
  createRolePermission,
  updatePassword,
  updatePicture,
  updatePicture,
  logout,
};
