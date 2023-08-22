const express = require("express");

// controller functions
const { createUser, fetchUsers} = require("./userController");

const router = express.Router();

router.post("/create", createUser);
router.get("/", fetchUsers);

module.exports = router;
