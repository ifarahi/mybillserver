const express = require("express");
const employeeRouter = express.Router();
const employeeController = require('../controllers/employeeController');
//const auth = require('../middlewares/auth');


employeeRouter.use(express.json());

employeeRouter.route("/add").post(
    employeeController.add,
);

employeeRouter.route("/get").get(
    employeeController.get,
);

employeeRouter.route("/update").post(
    employeeController.update,
);

employeeRouter.route("/delete").post(
    employeeController.delete,
);

module.exports = employeeRouter;
