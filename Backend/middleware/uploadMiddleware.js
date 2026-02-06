// // const multer = require('multer');
// // const path = require('path');
// // const fs = require('fs');

// // // Ensure uploads folder exists
// // const uploadDir = path.join(__dirname, '../uploads');
// // if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => cb(null, uploadDir),
// //   filename: (req, file, cb) => {
// //     const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
// //     cb(null, uniqueName);
// //   }
// // });

// // const upload = multer({ storage });

// // module.exports = upload;


// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "avatars",
//     allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
//     transformation: [{ width: 300, height: 300, crop: "fill" }],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;



const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isPdf = file.mimetype === "application/pdf";

    return {
      folder: "project_files",
      resource_type: isPdf ? "raw" : "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
      transformation: isImage
        ? [{ width: 300, height: 300, crop: "fill" }]
        : undefined, 
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

module.exports = upload;
