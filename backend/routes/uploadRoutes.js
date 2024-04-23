import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const extname = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpe?g|png|webp/;
  const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  if (fileTypes.test(extname) && mimeTypes.test(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error("Multer Error:", err);
      res.status(400).send({ message: "Error uploading image" });
    } else if (err) {
      // An unknown error occurred.
      console.error("Unknown Error:", err);
      res.status(500).send({ message: "Unknown error occurred" });
    } else if (!req.file) {
      // No file provided.
      res.status(400).send({ message: "No image file provided" });
    } else {
      // File uploaded successfully.
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    }
  });
});

export default router;
