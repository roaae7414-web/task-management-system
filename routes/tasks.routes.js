const express = require("express");

const router = express.Router();

const multerUpload = require("../middleware/multer-middleware");

const {
  gettasks,
  addtask,
  getTaskById,
  updatetask,
  deletetask
} = require("../controllers/tasks.controller");

router.get("/tasks", gettasks);
router.post("/tasks", multerUpload.single("imageUrl"), addtask);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updatetask);
router.delete("/tasks/:id", deletetask);

module.exports = router;