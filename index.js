require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./User/userRoute");


const app = express();

app.use(express.json());

// Routes
app.use("/users", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        "connected to database and listening for requests on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
