const { UNKNOWN_ERROR } = require('../helpers/constants');
const billModel = require('../models/billModel');


module.exports = {
    getAll: async (req, res) => {
        try {
            const bill = await billModel.getAll();
            return res.json({
                status: 200,
                msg: 'Success',
                data: bill,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                msg: UNKNOWN_ERROR,
                data: error,
            });
        }
    },
    setApproved: async (req, res) => {
        try {
            const { _id } = req.body;
            const bill = await billModel.setApproved(_id);
            return res.json({
                status: 200,
                msg: 'Success',
                data: bill,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                msg: UNKNOWN_ERROR,
                data: error,
            });
        }
    },
    setRejected: async (req, res) => {
        try {
            const { _id } = req.body;
            const bill = await billModel.setRejected(_id);
            return res.json({
                status: 200,
                msg: 'Success',
                data: bill,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                msg: UNKNOWN_ERROR,
                data: error,
            });
        }
    },
    setExpired: async (req, res) => {
        try {
            const { _id } = req.body;
            const bill = await billModel.setExpired(_id);
            return res.json({
                status: 200,
                msg: 'Success',
                data: bill,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                msg: UNKNOWN_ERROR,
                data: error,
            });
        }
    },
}