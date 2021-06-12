const { UNKNOWN_ERROR } = require('../helpers/constants');
const billModel = require('../models/billModel');
const { send } = require('../helpers/sendMail');


module.exports = {
    add: async (req, res) => {
        const { billContent } = req.body;
        const { _id } = req.decoded;
        try {
            const globalBill = {
                billContent,
                totalPrice: billContent.totalPrice,
                billType: billContent.billType,
                idR: billContent.idR,
                status: 'Pending',
                date: new Date(),
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
    },
    sendBill: async (req, res) => {
        try {
            const { currentURL } = req.body;
            const { companyEmail } = req.decoded;

            const emailDetails = {
                receiver: companyEmail,
                subject: "Your bill",
                html: `<h1>click here see you bill <a href="${req.headers.origin}${currentURL}">Here !!</a></h1>`
            }
            res.json({
                status: 200,
                msg: 'Success',
                data: {},
            });
            send(emailDetails).catch(err => console.log(err));
        } catch (error) {
            res.status(500).json({
                status: 500,
                msg: UNKNOWN_ERROR,
                data: error,
            });
        }
    }
}