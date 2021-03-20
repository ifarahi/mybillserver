const { INVALID_DATA, UNKNOWN_ERROR } = require('../helpers/constants');
const companyModel = require('../models/companyModel');
const Generator = require('uuid-token-generator');
const jwtOperations = require('../helpers/checkToken');

module.exports = {
    register: async (req, res) => {
        const params = {
            companyName: req.body.companyName || "",
            companyEmail: req.body.companyEmail || "",
            companyPhone: req.body.companyPhone || "",
            companyAddress: req.body.companyAddress || "",
            pass: req.body.pass || "",
            emailToken: new Generator().generate(),
            activated: false,
        };
        try {
            companyModel.add(params, (err, company) => {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        msg: UNKNOWN_ERROR,
                        data: err,
                    });
                } else {
                    res.json({
                        status: 200,
                        msg: 'Success',
                        data: company,
                    });
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                msg: UNKNOWN_ERROR,
                data: error,
            });
        }
    },
    login: async (req, res) => {
        const params = {
            companyEmail: req.body.companyEmail || "",
            pass: req.body.pass || "",
        };
        try {
            const result = await companyModel.searchToLogin(params);
            const jwtToken = jwtOperations.generateToken({
                companyEmail: params.companyEmail,
                _id: result?._id
            })
            result ? res.status(200).json({
                status: 200,
                msg: 'Success',
                data: {
                    token: jwtToken
                },
            }) : res.status(400).json({
                status: 400,
                msg: INVALID_DATA,
                data: {
                    login: 'Invalid Email or password'
                },
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                msg: UNKNOWN_ERROR,
                data: error,
            });
        }
    }
}