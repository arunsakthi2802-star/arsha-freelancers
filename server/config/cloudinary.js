const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { Readable } = require("stream");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a buffer to Cloudinary using streams (works with cloudinary v2)
const uploadToCloudinary = (buffer, folder, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `arsha/${folder}`,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
};

// Delete from Cloudinary by public_id
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
};

// Multer memory storage (files stored in buffer, then streamed to Cloudinary)
const memStorage = multer.memoryStorage();

const createUploader = (fileSizeLimit = 10 * 1024 * 1024) =>
  multer({
    storage: memStorage,
    limits: { fileSize: fileSizeLimit },
    fileFilter: (req, file, cb) => {
      const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed."), false);
      }
    },
  });

const uploadGallery = createUploader(10 * 1024 * 1024);
const uploadProfile = createUploader(5 * 1024 * 1024);
const uploadStory = createUploader(10 * 1024 * 1024);
const uploadReview = createUploader(5 * 1024 * 1024);
const uploadGeneric = multer({
  storage: memStorage,
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB limit
});

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
  uploadGallery,
  uploadProfile,
  uploadStory,
  uploadReview,
  uploadGeneric,
};
