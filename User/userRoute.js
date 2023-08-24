const express = require("express");

// controller functions
const {
  createUser,
  fetchUsers,
  changeUsername,
  getUser,
} = require("./userController");

const router = express.Router();

router.post("/create", createUser);
router.get("/:username?", fetchUsers);
router.post("/changeUsername", changeUsername);
router.get("/getInfo/:user?", getUser);

module.exports = router;
