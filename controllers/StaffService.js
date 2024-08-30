const StaffRepository = require("./StaffRepository.js");

class AdminService {
  async createStaff(staffData) {
    await StaffRepository.createStaff(staffData);
  }

  async updateStaff(id, staffData) {
    const staff = await StaffRepository.findById(id);
    if (staff) {
      await StaffRepository.updateStaff(id, staffData);
    } else {
      throw new Error("Invalid Staff ID");
    }
  }

  async deleteStaff(id) {
    const staff = await StaffRepository.findById(id);
    if (staff) {
      await StaffRepository.deleteStaff(id);
    } else {
      throw new Error("Invalid Staff ID");
    }
  }

  async searchStaff(name, specialization, practice) {
    if (name || specialization || practice) {
      return await StaffRepository.searchStaff(name, specialization, practice);
    } else {
      return await StaffRepository.findAll();
    }
  }
}

module.exports = new AdminService();
