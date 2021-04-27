const { INVALID_DATA, UNKNOWN_ERROR } = require('../helpers/constants');
const billModel = require('../models/billModel');


module.exports = {
    add: async (req, res) => {
        const { bill, clientName, billType } = req.body;
        const { _id } = req.decoded;
        let totalPrice = 0;
        try {
            bill?.forEach(item => {
                totalPrice += Number(item?.totalPrice);
            });
            bill.totalPrice = 0;
            bill.date = new Date();
            const globalBill = {
                billContent: bill,
                date: new Date(),
                totalPrice: String(totalPrice),
                billType,
                clientName,
                companyId: _id,
            }
            billModel.add(globalBill, (err, theBill) => {
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
    },
    getAll: async (req, res) => {
        try {
            const { _id } = req.decoded;
            const bill = await billModel.get(_id);
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