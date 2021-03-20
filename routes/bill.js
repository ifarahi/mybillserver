const express = require("express");
const billRouter = express.Router();
const billController = require('../controllers/billController');
const auth = require('../middlewares/auth');


billRouter.use(express.json());

billRouter.route("/add").post(
    billController.add,
);

billRouter.route("/getById/:_id").get(
    billController.getOneBill,
);

billRouter.route("/get/Ids").get(
    billController.getAllIds,
);

module.exports = billRouter;