const express = require("express");
const router = express.Router();


router.use("/company", require("./company"));
router.use("/bill", require("./bill"));
router.use("/employee", require("./employee"));
router.use("/webservice", require("./webservice"));

module.exports = router;