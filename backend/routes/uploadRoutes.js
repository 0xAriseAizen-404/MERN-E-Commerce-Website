import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, callback) => {
    const extname = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// Set up file filter for image types
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpe?g|png|webp/;
  const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  if (fileTypes.test(extname) && mimeTypes.test(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WebP images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: limit file size to 5MB
});

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific error (e.g., file too large)
      console.error("Multer Error:", err);
      return res
        .status(400)
        .json({ message: "Error uploading image", error: err.message });
    } else if (err) {
      // General error (e.g., invalid file type)
      console.error("Unknown Error:", err);
      return res.status(400).json({ message: err.message });
    } else if (!req.file) {
      // No file provided
      return res.status(400).json({ message: "No image file provided" });
    }

    // File uploaded successfully
    res.status(200).json({
      message: "Image uploaded successfully",
      imagePath: `/uploads/${req.file.filename}`,
    });
  });
});

export default router;
