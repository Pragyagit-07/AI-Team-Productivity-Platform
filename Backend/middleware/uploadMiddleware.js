// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure uploads folder exists
// const uploadDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 300, height: 300, crop: "fill" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
