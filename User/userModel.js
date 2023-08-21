const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

userSchema.statics.createUser = async function (username) {
  const exists = await this.findOne({
    username: { $regex: new RegExp(username, "i") },
  });

  if (exists) {
    throw Error("Username already exists!");
  }

  const user = await this.create({ username, score: 0 });

  return user;
};

module.exports = mongoose.model("User", userSchema);
