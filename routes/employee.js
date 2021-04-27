const express = require("express");
const employeeRouter = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middlewares/auth');


employeeRouter.use(express.json());

employeeRouter.route("/add").post(
    auth,
    employeeController.add,
);

employeeRouter.route("/get").get(
    auth,
    employeeController.get,
);

employeeRouter.route("/update").post(
    employeeController.update,
);

employeeRouter.route("/delete").post(
    employeeController.delete,
);

module.exports = employeeRouter;
