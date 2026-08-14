const multer = require("multer");
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "uploads";

    if (req.baseUrl.includes("tasks")) {
      dest = "uploads/tasks";
    }

    try {
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, null);
    }
  },

  filename: function (req, file, cb) {
    const fileType = file.mimetype.split("/")[1];
    let fileName = `task-${Date.now()}.${fileType}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];

  if (fileType === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter,
});

module.exports = upload;