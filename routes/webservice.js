const express = require("express");
const webserviceRouter = express.Router();
const webSeviceController = require('../controllers/webSeviceController');


webserviceRouter.use(express.json());

webserviceRouter.route("/get").get(
    webSeviceController.getAll,
);

webserviceRouter.route("/approved").post(
    webSeviceController.setApproved,
);

webserviceRouter.route("/rejected").post(
    webSeviceController.setRejected,
);

webserviceRouter.route("/expired").post(
    webSeviceController.setExpired,
);

module.exports = webserviceRouter;