const { INVALID_DATA, UNKNOWN_ERROR } = require('../helpers/constants');
const employeeModel = require('../models/employeeModel');


module.exports = {
    add: async (req, res) => {
        const {
            reference,
            firstName,
            lastName,
            phone,
            address,
            role,
            salaire,
            holydays
        } = req.body;
        const employee = {
            reference,
            firstName,
            lastName,
            phone,
            address,
            role,
            salaire,
            holydays: Number(holydays) || 18,
        };

        try {
            employeeModel.add(employee, (err, theEmployee) => {
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
                        data: theEmployee,
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
    get: async (req, res) => {
        try {
            const employee = await employeeModel.get({});
            return res.json({
                status: 200,
                msg: 'Success',
                data: employee,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                msg: UNKNOWN_ERROR,
                data: error,
            });
        }
    },
    update: async (req, res) => {
        const { _id, data } = req.body;
        try {
            await employeeModel.update(_id, data);
            return res.json({
                status: 200,
                msg: 'Success',
                data: {}
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                msg: UNKNOWN_ERROR,
                data: error,
            });
        }
    },
    delete: async (req, res) => {
        const { _id } = req.body;
        try {
            await employeeModel.delete(_id);
            return res.json({
                status: 200,
                msg: 'Success',
                data: {}
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