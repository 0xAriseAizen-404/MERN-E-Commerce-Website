import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// Helper function to upload image to Cloudinary
const uploadImageToCloudinary = async (image) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      asset_folder: "AAStore",
      resource_type: "image",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error.message);
    throw new Error("Image upload failed");
  }
};

const createProduct = asyncHandler(async (req, res) => {
  try {
    // const product = await Product.create(req.body);
    const { name, description, price, category, quantity, brand, image } =
      req.fields;
    switch (true) {
      case !image:
        return res.json({ error: "Image is required" });
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      default:
        break;
    }
    let imageUrl = await uploadImageToCloudinary(image);

    const createdProduct = await new Product({
      ...req.fields,
      image: imageUrl,
    }).save();

    res.json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
    // res.status(400).json({
    //   status: "fail",
    //   message: "Couldn't create product",
    //   error,
    // });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand, image } =
      req.fields;

    // Check if any required fields are missing
    const requiredFields = {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      image,
    };
    const missingField = Object.keys(requiredFields).find(
      (key) => !requiredFields[key]
    );
    if (missingField) {
      return res.status(400).json({
        error: `${
          missingField.charAt(0).toUpperCase() + missingField.slice(1)
        } is required`,
      });
    }

    let imageUrl = await uploadImageToCloudinary(image);
    req.fields.image = imageUrl;

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.fields,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ error: `${req.params.id} is not available` });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update product" });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.image) {
      const imgId = event.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const getProductsByKeyword = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      // .limit(12)
      .sort({ createAt: -1 });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = await product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        // res.status(400).json({ message: "Product already reviewed" });
        throw new Error("Product already reviewd");
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByKeyword,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
