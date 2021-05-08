const express = require("express");
const companyRouter = express.Router();
const companyController = require('../controllers/companyController');
const companyMiddlwares = require('../middlewares/registration');


companyRouter.use(express.json());

companyRouter.route("/register").post(
    companyMiddlwares.registerValidator,
    companyMiddlwares.isEmailExist,
    companyController.register
);

companyRouter.route("/login").post(
    companyController.login
);

companyRouter.route("/confirm").post(
    companyController.confirm
);

module.exports = companyRouter;