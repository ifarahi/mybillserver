const { INVALID_DATA, UNKNOWN_ERROR } = require('../helpers/constants');
const billModel = require('../models/billModel');


module.exports = {
    add: async (req, res) => {
        const { bill } = req.body;
        try {
            billModel.add(bill, (err, theBill) => {
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
                        data: theBill,
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
    getOneBill: async (req, res) => {
        const { _id } = req.params;
        try {
            const bill = await billModel.getBill({ _id });
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
    getAllIds: async (req, res) => {
        try {
            const bill = await billModel.getIds();
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
    }
}