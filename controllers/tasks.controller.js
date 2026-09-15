const Task = require("../models/task.model");
const deleteUploadedFile = require("../utils/delete-uploaded-file");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      status: "success",
      count: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch tasks: ${error.message}`,
    });
  }
};

// Create task
const createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      imageUrl: req.file?.filename,
    });

    res.status(201).json({
      status: "success",
      message: "Task added successfully",
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("tasks", req.file.filename);
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    if (req.file) {
      req.body.imageUrl = req.file.filename;

      if (task.imageUrl) {
        deleteUploadedFile("tasks", task.imageUrl);
      }
    }

    Object.assign(task, req.body);

    const updatedTask = await task.save();

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: {
        task: updatedTask,
      },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("tasks", req.file.filename);
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    if (deletedTask.imageUrl) {
      deleteUploadedFile("tasks", deletedTask.imageUrl);
    }

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
      data: {
        task: deletedTask,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};