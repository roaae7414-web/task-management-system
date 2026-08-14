const Task = require("../models/task.model");

const gettasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error getting tasks",
      error: error.message,
    });
  }
};

const addtask = async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      imageUrl: req.file ? req.file.filename : null,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Error adding task",
      error: error.message,
    });
  }
};
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error getting task",
      error: error.message,
    });
  }
};

const updatetask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

const deletetask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};

module.exports = {
  gettasks,
  addtask,
  getTaskById,
  updatetask,
  deletetask,
};