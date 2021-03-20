const express = require("express");
const router = express.Router();


router.use("/company", require("./company"));
router.use("/bill", require("./bill"));

module.exports = router;