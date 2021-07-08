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
                    
                    const html = `
                        <div style="font-family: Monotype Corsiva; font-size: 15px; padding: 0 .3rem; width: 100%;">
                            <center><span style="color: #364d59; font-size: 38px; font-weight: 900;">Boo<span style="color: #00909e;">king</span></span></center>
                        </div>
                        <br />
                        <br />
                        <div>
                            Chère cleint, votre reservation avec ce ID ${theBill._id} a etait traiter. possible de payer facture chez un centre de paiement
                        </div>
                    `;
                    const emailDetails = {
                        receiver: billContent.email,
                        subject: "Votre reservation",
                        html
                    }
                    res.json({
                        status: 200,
                        msg: 'Success',
                        data: theBill,
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
            const html = `
                <div style="font-family: Monotype Corsiva; font-size: 15px; padding: 0 .3rem; width: 100%;">
                    <center><span style="color: #364d59; font-size: 38px; font-weight: 900;">Boo<span style="color: #00909e;">king</span></span></center>
                </div>
                <br />
                <br />
                <div>
                    <h1>clicker içi pour ouvrir votre facture <a href="${req.headers.origin}${currentURL}">içi !!</a></h1>
                </div>
            `;
            const emailDetails = {
                receiver: companyEmail,
                subject: "Votre facture",
                html
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