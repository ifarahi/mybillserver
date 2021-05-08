const mongoose = require('../db/db');

const companySchema = new mongoose.Schema({
    companyName: String,
    companyEmail: String,
    companyPhone: String,
    companyAddress: String,
    pass: String,
    emailToken: String,
    activated: Boolean,
});

const Company = mongoose.model("company", companySchema);

module.exports = {
    add: async (userInfos, callback) => {
        const newCompany = new Company(userInfos);
        newCompany.activated = false;
        await newCompany.save(callback);
    },
    searchCompany: companyEmail => {
        return Company.findOne({ companyEmail: companyEmail })
    },
    searchToLogin: params => {
        return Company.findOne({ companyEmail: params.companyEmail, pass: params.pass })
    },
    confirm: emailToken => {
        return Company.updateOne({ emailToken }, {
            activated: true
        })
    },
    getOneId: async emailToken => {
        return await Company.findOne({ emailToken, activated: false });
    },
};

