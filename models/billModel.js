const mongoose = require('../db/db');

/*const billContentSchema = new mongoose.Schema({
    ID: String,
    productName: String,
    qte: String,
    price: String,
    totalPrice: String,
});*/

const billSchema = new mongoose.Schema({
    billContent: Object,
    totalPrice: String,
    clientName: String,
    billType: String,
    idR: String,
    status: String,
});

const Bill = mongoose.model("bill", billSchema);


module.exports = {
    add: async (data, callback) => {
        const newBill = new Bill(data);
        await newBill.save(callback);
    },
    getBill: finder => {
        return Bill.findOne(finder);
    },
    getIds: () => {
        return Bill.find({}, '_id');
    },
    get: (companyId) => {
        return Bill.find({ companyId });
    },
    getAll: () => {
        return Bill.find();
    },
    setExpired: async (id) => {
        return await Bill.findByIdAndUpdate(id, { status: 'Expired' }, {
            useFindAndModify: false
        });
    },
    setApproved: async (id) => {
        return await Bill.findByIdAndUpdate(id, { status: 'Approved' }, {
            useFindAndModify: false
        });
    },
    setRejected: async (id) => {
        return await Bill.findByIdAndUpdate(id, { status: 'Rejected' }, {
            useFindAndModify: false
        });
    }
}
