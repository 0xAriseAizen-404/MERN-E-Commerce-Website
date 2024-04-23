import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";
// mongoose.set("debug", true);

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already Exists" });
    }
    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const existingCategory = await Category.findOne({
      _id: categoryId,
    });
    if (!existingCategory) {
      return res.status(400).json({ error: "Category not found" });
    }
    existingCategory.name = name;
    const updatedCategory = await existingCategory.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    // if (!deletedCategory) {
    //   return res.status(400).json({ error: "Category not found" });
    // }
    res.json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.categoryId });
    res.send(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  readCategory,
};
