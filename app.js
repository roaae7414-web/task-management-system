require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const tasksRouter = require("./routes/tasks.routes");
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");

const app = express();

app.use(express.json());

app.use(tasksRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

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