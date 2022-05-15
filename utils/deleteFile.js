const fs = require('fs');

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Error deleting file: ", err);
    }
  });
};

module.exports = deleteFile;