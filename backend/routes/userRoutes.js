import express from "express";
import {
  createUser,
  logInUser,
  logOutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", logInUser);

router.post("/logout", logOutUser);

router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);

router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
