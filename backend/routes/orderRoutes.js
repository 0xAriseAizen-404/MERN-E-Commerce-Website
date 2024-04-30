import express from "express";
const router = express.Router();
import asyncHandler from "../middlewares/asyncHandler.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markAsPaidOrder,
  markAsDeliverPaid,
} from "../controllers/orderController.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(authenticate, countTotalOrders);
router.route("/total-sales").get(authenticate, calculateTotalSales);
router
  .route("/total-sales-by-date")
  .get(authenticate, calculateTotalSalesByDate);
router.route("/:id").get(authenticate, findOrderById);
router.route("/:id/pay").put(authenticate, markAsPaidOrder);
router
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markAsDeliverPaid);

export default router;
