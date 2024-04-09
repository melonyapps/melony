const express = require("express");

const routerV1 = express.Router();

routerV1.use("/auth");

module.exports = { routerV1 };
