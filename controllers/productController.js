import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(404).json({ message: "Name not found!!" });
      case !description:
        return res.status(404).json({ message: "Description not found!!" });
      case !price:
        return res.status(404).json({ message: "Price not found!!" });
      case !category:
        return res.status(404).json({ message: "Category not found!!" });
      case !quantity:
        return res.status(404).json({ message: "Quantity not found!!" });
      case photo && photo.size > 100000:
        return res.status(404).json({
          message: "Photo is required and should be less than 1mb",
        });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).json({
      success: true,
      message: "Your product have been created successfully",
      products,
    });
  } catch (error) {
    console.log("Something wrong with Create Product", error);
    res.status(500).json({
      success: false,
      message: "SomeThing went wrong with Create Product...",
      error,
    });
  }
};

// get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      total_count: products.length,
      message: "Here's All the products...",
      products,
    });
  } catch (error) {
    console.log("Error while fetching products", error);
    res.status(500).json({
      success: false,
      message: "Something is wrong in fetching products data",
      error,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).json({
      success: true,
      message: "Here your product...",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something is wrong while fetching single product",
      error: error.message,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Couldn't get the photo",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occur while deleting product",
      error: error.message,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(404).json({ message: "Name not found!!" });
      case !description:
        return res.status(404).json({ message: "Description not found!!" });
      case !price:
        return res.status(404).json({ message: "Price not found!!" });
      case !category:
        return res.status(404).json({ message: "Category not found!!" });
      case !quantity:
        return res.status(404).json({ message: "Quantity not found!!" });
      case photo && photo.size > 100000:
        return res.status(404).json({
          message: "Photo is required and should be less than 1mb",
        });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).json({
      success: true,
      message: "Your product have been created successfully",
      products,
    });
  } catch (error) {
    console.log("Something wrong with Updating  Product", error);
    res.status(500).json({
      success: false,
      message: "SomeThing went wrong with Updating Product...",
      error,
    });
  }
};
