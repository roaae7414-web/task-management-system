const User = require("../models/user");
const Task = require("../models/task.model");

const addTaskToUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const { taskId } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    const alreadyAdded = user.myTasks.some(
      (id) => id.toString() === taskId
    );

    if (alreadyAdded) {
      return res.status(400).json({
        status: "fail",
        message: "Task already added",
      });
    }

    user.myTasks.push(taskId);

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Task added successfully",
      data: {
        myTasks: user.myTasks,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error in adding task ${error.message}`,
    });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("myTasks");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        myTasks: user.myTasks,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error in fetching your tasks ${error.message}`,
    });
  }
};

module.exports = {
  addTaskToUser,
  getUserTasks,
};