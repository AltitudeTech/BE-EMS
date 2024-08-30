const { Op } = require('sequelize');
const Staff = require('../models/StaffModel.js');

class StaffRepository {
    async createStaff(staffData) {
        return await Staff.create(staffData);
    }

    async findById(id) {
        return await Staff.findByPk(id);
    }

    async deleteStaff(id) {
        const staff = await this.findById(id);
        if (staff) {
            await staff.destroy();
            return true;
        }
        return false;
    }

    async updateStaff(id, staffData) {
        const staff = await this.findById(id);
        if (staff) {
            return await staff.update(staffData);
        }
        return null;
    }

     async searchStaff(name, specialization, practice) {
        const query = {};

        if (name) query.name = { [Op.like]: `%${name}%` };
        if (specialization) query.specialization = { [Op.like]: `%${specialization}%` };
        if (practice) query.practice = { [Op.like]: `%${practice}%` };

        return await Staff.findAll({ where: query });
    }

    async findAll() {
        return await Staff.findAll();
    }


    async findByEmailOrMobile(email, mobileNumber) {
        return await Staff.findOne({
            where: {
                [Op.or]: [{ email: email }, { mobileNumber: mobileNumber }],
            },
        });
    }
}

module.exports = new StaffRepository();
