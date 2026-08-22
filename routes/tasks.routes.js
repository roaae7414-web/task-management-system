const express = require("express");

const router = express.Router();

const multerUpload = require("../middleware/multer-middleware");

const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize-middleware");

const {
  gettasks,
  addtask,
  getTaskById,
  updatetask,
  deletetask,
} = require("../controllers/tasks.controller");

router
  .route("/tasks")
  .get(gettasks)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    multerUpload.single("imageUrl"),
    addtask
  );

router
  .route("/tasks/:id")
  .get(getTaskById)
  .put(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    multerUpload.single("imageUrl"),
    updatetask
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    deletetask
  );

module.exports = router;