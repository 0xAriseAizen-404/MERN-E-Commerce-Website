import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import generateToken from "../utils/createToken.js";

const printJson = (jsonOb) => {
  return {
    _id: jsonOb._id,
    username: jsonOb.username,
    email: jsonOb.email,
    isAdmin: jsonOb.isAdmin,
  };
};

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    throw new Error("please check the credentials");

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("please check the credentials");

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      generateToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return; // exit the fn after res sent
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  //   const user = await User.findOne({ email });
  //   if (user && (await user.matchPassword(password))) {
  //     generateToken(res, user._id);
  //     res.status(201).json({
  //       _id: user._id,
  //       username: user.username,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //     });
  //   } else {
  //     res.status(401);
  //     throw new Error("Invalid email or password");
  //   }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  // if (req.user && req.isAdmin) {
  const users = await User.find({});
  res.json(users);
  // } else {
  //   throw new Error("Not accessed as you are not an admin");
  // }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(printJson(user));
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await user.save();
    res.json(printJson(updatedUser));
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete Admin");
    } else {
      // await user.remove();
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: "User deleted successfully" });
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.status(200).json(user);
  printJson(user);
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const { username, email, isAdmin } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;
    user.isAdmin = Boolean(isAdmin);
    // admin can't change user password
    const updatedUser = await user.save();
    res.status(200).json(printJson(updatedUser));
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  logInUser,
  logOutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
