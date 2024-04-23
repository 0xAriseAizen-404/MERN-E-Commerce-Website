import mongoose from "mongoose";
import fetch from "node-fetch"; // Make sure to install node-fetch package
import Product from "./backend/models/productModel.js";
import Category from "./backend/models/categoryModel.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/AAStore");
    console.log("Successfully connected to MongoDB 👍💘😝");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

const createProductsAndCategories = async () => {
  try {
    const results = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );

    // Iterate through fetched data to create categories and products
    for (const result of results) {
      const {
        category: categoryName,
        title: name,
        description,
        price,
        image,
      } = result;

      // Check if category already exists
      let category = await Category.findOne({ name: categoryName });

      if (!category) {
        // If category does not exist, create it
        category = await new Category({ name: categoryName }).save();
      }

      // Create product with reference to category
      const createdProduct = await new Product({
        name,
        description,
        price,
        image,
        brand: "XXX",
        quantity: 3,
        countInStock: 100,
        category: category._id, // Assign category ID
      }).save();
      console.log("Created Product:", createdProduct);
    }
  } catch (error) {
    console.error("Error creating products and categories:", error);
  }
};

connectDB()
  .then(() => createProductsAndCategories())
  .catch((error) => console.error("Error connecting to database:", error));
