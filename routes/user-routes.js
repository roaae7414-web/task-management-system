const express = require("express");
const userControllers = require("../controllers/user-controllers");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize-middleware");

const router = express.Router();

router
  .route("/tasks")
  .get(
    authenticateMiddleware,
    authorizeMiddleware("student"),
    userControllers.getUserTasks,
  )
  .post(
    authenticateMiddleware,
    authorizeMiddleware("student"),
    userControllers.addTaskToUser,
  );

module.exports = router;