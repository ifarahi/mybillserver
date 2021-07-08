const { UNKNOWN_ERROR } = require('../helpers/constants');
const billModel = require('../models/billModel');
const { send } = require('../helpers/sendMail');


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
            const { _id, email } = req.body;
            const bill = await billModel.setApproved(_id);
            const html = `
                <div style="font-family: Monotype Corsiva; font-size: 15px; padding: 0 .3rem; width: 100%;">
                    <center><span style="color: #364d59; font-size: 38px; font-weight: 900;">Boo<span style="color: #00909e;">king</span></span></center>
                </div>
                <br />
                <br />
                <div>
                    <h1>clicker içi pour ouvrir votre facture <a href="${req.headers.origin}/mybill/${_id}">içi !!</a></h1>
                </div>
            `;
            const emailDetails = {
                receiver: email,
                subject: "Bill payed",
                html
            }
            send(emailDetails).catch(err => console.log(err));
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
            const { _id, email } = req.body;
            const bill = await billModel.setRejected(_id);
            const emailDetails = {
                receiver: email,
                subject: "Bill Rejected",
                html: `<h2>your bill has been Rejected</h2>`
            }
            send(emailDetails).catch(err => console.log(err));
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
            const { _id, email } = req.body;
            const bill = await billModel.setExpired(_id);
            const emailDetails = {
                receiver: email,
                subject: "Bill Expired",
                html: `<h2>your bill has been Expired</h2>`
            }
            send(emailDetails).catch(err => console.log(err));
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