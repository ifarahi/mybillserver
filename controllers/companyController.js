const { INVALID_DATA, UNKNOWN_ERROR } = require('../helpers/constants');
const companyModel = require('../models/companyModel');
const Generator = require('uuid-token-generator');
const jwtOperations = require('../helpers/checkToken');
const { send } = require('../helpers/sendMail');
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
                    const emailDetails = {
                        receiver: params.companyEmail,
                        subject: "Confirm your account",
                        html: `<h1> click here to active you account <a href="${req.headers.origin}/confirm/${params.emailToken}">Here !!</a></h1>`
                    }
                    res.json({
                        status: 200,
                        msg: 'Success',
                        data: company,
                    });
                    send(emailDetails).catch(err => console.log(err));
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
    confirm: async (req, res) => {
        try {
            const { token } = req.body;
            const result = await companyModel.getOneId(token);
            if (result) {
                await companyModel.confirm(token);
                return res.status(200).json({
                    status: 200,
                    msg: 'account activated',
                    data: result,
                });
            }
            else {
                return res.status(400).json({
                    status: 400,
                    msg: 'wrong token',
                    data: result,
                });
            }
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
            activated: true,
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