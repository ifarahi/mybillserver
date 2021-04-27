const express = require("express");
const billRouter = express.Router();
const billController = require('../controllers/billController');
const auth = require('../middlewares/auth');


billRouter.use(express.json());

billRouter.route("/add").post(
    auth,
    billController.add,
);

billRouter.route("/getById/:_id").get(
    auth,
    billController.getOneBill,
);

billRouter.route("/get/Ids").get(
    auth,
    billController.getAllIds,
);

billRouter.route("/get").get(
    auth,
    billController.getAll,
);

module.exports = billRouter;