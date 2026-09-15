const express = require("express");

const taskControllers = require("../controllers/tasks.controller");

const multerUpload = require("../middleware/multer-middleware");

const authenticateMiddleware = require("../middleware/authenticate-middleware");

const authorizeMiddleware = require("../middleware/authorize-middleware");

const router = express.Router();

router
  .route("/")
  .get(taskControllers.getAllTasks)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    multerUpload.single("imageUrl"),
    taskControllers.createTask,
  );

router
  .route("/:id")
  .get(taskControllers.getTaskById)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    multerUpload.single("imageUrl"),
    taskControllers.updateTask,
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    taskControllers.deleteTask,
  );

module.exports = router;