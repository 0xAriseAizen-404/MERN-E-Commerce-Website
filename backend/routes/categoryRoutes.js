// categoryRoutes.js

import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  readCategory,
} from "../controllers/categoryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Other routes
router.route("/").post(authenticate, authorizeAdmin, createCategory);

// Route for listing categories
router.route("/categories").get(authenticate, authorizeAdmin, getAllCategories);

router
  .route("/:categoryId")
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, deleteCategory)
  .get(readCategory);

export default router;
