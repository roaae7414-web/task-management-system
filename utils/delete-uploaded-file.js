const fs = require ("fs");
const path = require("path");

function deleteUploadedFile(folderName, fileName) {
    const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    folderName,
    fileName
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Error deleting file:", err.message);
    }
  });
}

module.exports = deleteUploadedFile;