import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByKeyword,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";

router
  .route("/")
  .get(getProductsByKeyword)
  .post(authenticate, authorizeAdmin, formidable(), createProduct);

router.route("/allproducts").get(getAllProducts);

router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, deleteProduct);

export default router;
