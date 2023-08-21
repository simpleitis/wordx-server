const User = require("./userModel");

// Create user
const createUser = async function (req, res) {
  const { username } = req.body;

  try {
    const user = await User.createUser(username);

    res.status(200).json({ username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createUser };
