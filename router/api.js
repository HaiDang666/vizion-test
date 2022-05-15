const express = require("express");
const router = express.Router();

const applicantTests = require("./applicantTests");
router.use("/applicantTests", applicantTests);

module.exports = router;