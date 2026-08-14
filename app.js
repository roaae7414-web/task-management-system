require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const tasksRouter = require("./routes/tasks.routes");

const app = express();

app.use(express.json());

app.use(tasksRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Database Connection Error:", error.message);
  });