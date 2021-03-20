const mongoose = require('../db/db');

const employeeSchema = new mongoose.Schema({
    reference: String,
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    role: String,
    salaire: String,
    holydays: Number,
});

const Employee = mongoose.model("employee", employeeSchema);


module.exports = {
    add: async (userInfos, callback) => {
        const newEmployee = new Employee(userInfos);
        await newEmployee.save(callback);
    },
    get: (finder = {}) => {
        return Employee.find(finder);
    },
};

