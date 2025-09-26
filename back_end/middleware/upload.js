const multer = require("multer");
const path = require("path");
const fs = require("fs");

// create uploads folder if not exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    // jfif ko jpg me convert karo
    if (ext === ".jfif") ext = ".jpg";
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else
    cb(new Error("Invalid file type. Only PDF, DOC, DOCX, JPG, PNG allowed."));
};

module.exports = multer({ storage, fileFilter });
