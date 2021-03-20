const express = require("express");
const router = express.Router();


router.use("/company", require("./company"));
router.use("/bill", require("./bill"));
router.use("/employee", require("./employee"));

module.exports = router;