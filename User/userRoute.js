const express = require("express");

// controller functions
const { createUser } = require("./userController");

const router = express.Router();

router.post("/create", createUser);

module.exports = router;
