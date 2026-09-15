const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = require("./config/db-connect");
const Task = require("./models/task.model");

const tasks = [
  {
    title: "Task Management",
    description:
      "Build and manage tasks using the task management system.",
    status: "pending",
    dueDate: "2026-10-01",
    imageUrl: "tasl-list.png.jpg",
  },
  {
    title: "Study MongoDB",
    description:
      "Learn MongoDB collections, documents, queries, and basic database operations.",
    status: "pending",
    dueDate: "2026-10-05",
    imageUrl: "image1.png.jpg",
  },
  {
    title: "Learn Multer",
    description:
      "Learn how to upload and handle images and files using Multer in Express.",
    status: "pending",
    dueDate: "2026-10-10",
    imageUrl: "task-mangment.png.jpg",
  },
  {
    title: "Learn Angular",
    description:
      "Practice Angular components, services, routing, signals, and forms.",
    status: "pending",
    dueDate: "2026-10-15",
    imageUrl: "tasl-list.png.jpg",
  },
  {
    title: "Practice TypeScript",
    description:
      "Practice interfaces, types, functions, arrays, and TypeScript basics.",
    status: "in-progress",
    dueDate: "2026-10-20",
    imageUrl: "image1.png.jpg",
  },
  {
    title: "Build REST API",
    description:
      "Create and test REST API endpoints using Node.js, Express, and MongoDB.",
    status: "pending",
    dueDate: "2026-10-25",
    imageUrl: "task-mangment.png.jpg",
  },
];

const seedTasks = async () => {
  try {
    await dbConnect();

    for (const task of tasks) {
      const existingTask = await Task.findOne({
        title: task.title,
      });

      if (!existingTask) {
        await Task.create(task);
        console.log(`Added: ${task.title}`);
      } else {
        console.log(`Already exists: ${task.title}`);
      }
    }

    console.log("Tasks seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedTasks();