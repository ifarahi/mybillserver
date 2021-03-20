const mongoose = require('../db/db');

const billContentSchema = new mongoose.Schema({
    ID: String,
    productName: String,
    qte: String,
    price: String,
    totalPrice: String,
});

const billSchema = new mongoose.Schema({
    billContent: [billContentSchema]
});

const Bill = mongoose.model("bill", billSchema);


module.exports = {
    add: async (data, callback) => {
        const newBill = new Bill({ billContent: data });
        await newBill.save(callback);
    },
    getBill: finder => {
        return Bill.findOne(finder);
    },
    getIds: () => {
        return Bill.find({}, '_id');
    }
}
