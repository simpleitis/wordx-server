const express = require("express");

// controller functions
const { createUser, fetchUsers, changeUsername } = require("./userController");

const router = express.Router();

router.post("/create", createUser);
router.get("/:username?", fetchUsers);
router.post("/changeUsername", changeUsername);

module.exports = router;
