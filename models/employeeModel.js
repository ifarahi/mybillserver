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
    companyId: String,
    email: String,
    password: String,
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
    update: async (id, newData) => {
        return await Employee.findByIdAndUpdate(id, newData, {
            useFindAndModify: false
        });
    },
    delete: async id => {
        return await Employee.findByIdAndRemove(id, { useFindAndModify: false });
    },
    searchToLogin: params => {
        return Employee.findOne({ email: params.companyEmail, password: params.pass })
    },
};

