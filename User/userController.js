const User = require("./userModel");

const calculatePercentile = (users, username) => {
  const data = users;

  // Replace this with the username you want to calculate the percentile for
  const targetUsername = username;

  // Find the user's score
  const userEntry = data.find((entry) => entry.username === targetUsername);

  if (userEntry) {
    // Extract all scores and sort them
    const allScores = data.map((entry) => entry.score).sort((a, b) => a - b);

    // Find the index of the user's score in the sorted array
    const userIndex = allScores.indexOf(userEntry.score);

    // Calculate the percentile
    const percentile = (userIndex / (allScores.length - 1)) * 100;

    return percentile.toFixed(2);
  } else {
    return "0.00";
  }
};

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
    // FETCH ALL USERS
    const users = await User.find({}).sort({ score: -1 });

    // FETCH THE LOGGED IN USER
    const username = req.params.username;
    let user;
    if (!!username) {
      user = await User.find({ username: username });
    }

    // CALCULATE THE PERCENTILE
    const currentYear = new Date().getFullYear();
    // All time
    const allTimePercentile = calculatePercentile(users, username);

    //Current year
    const filteredYearData = users.filter((entry) => {
      const entryYear = new Date(entry.updatedAt).getFullYear();
      return entryYear === currentYear;
    });
    const yearPercentile = calculatePercentile(filteredYearData, username);

    // Current day
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const filteredDayData = users.filter((entry) => {
      const entryDate = new Date(entry.updatedAt);
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth();
      const entryDay = entryDate.getDate();
      return (
        entryYear === currentYear &&
        entryMonth === currentMonth &&
        entryDay === currentDay
      );
    });
    const dayPercentile = calculatePercentile(filteredDayData, username);

    // CALCULATE RANK
    const userEntry = users.find((entry) => entry.username === username);
    const allScores = users.map((entry) => entry.score).sort((a, b) => b - a);
    const userIndex = allScores.indexOf(userEntry.score);
    const rank = userIndex + 1;

    const finalResult = [
      ...users.slice(0, 5),
      { ...user, rank: rank },
      {
        percentile: {
          day: dayPercentile,
          year: yearPercentile,
          allTime: allTimePercentile,
        },
      },
    ];
    res.status(200).json({ finalResult });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createUser, fetchUsers };
