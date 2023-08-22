const User = require("./userModel");

// Create user
const createUser = async function (req, res) {
  const { username, score } = req.body;

  try {
    const user = await User.createUser(username, score);

    res.status(200).json({ username, score });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const fetchUsers = async function (req, res) {
  try {
    const users = await User.find({}).sort({ score: -1 }).limit(5);
    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createUser, fetchUsers };
