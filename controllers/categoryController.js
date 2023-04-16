import colors from "colors";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    // validation
    if (!name) {
      return res.status(401).json({ message: "Name is required!" });
    }
    // checking is the category exist or not
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res
        .status(200)
        .json({ success: true, message: "Category already exist" });

    // creating category
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).json({
      success: true,
      message: "Category is created",
      category,
    });
  } catch (error) {
    console.log("error on category Controller".bgRed.white, error);
    res.status(500).json({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    // updating the category
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
  } catch (error) {
    console.log("Error with updating the category".bgRed.white, error);
    res.status(500).json({
      success: false,
      message: "Error with updating",
      error,
    });
  }
};

// get all category controller
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).json({
      success: true,
      message: "List of category are :- ",
      category,
    });
  } catch (error) {
    console.log("Error while getting all category".bgRed.white, error);
    res
      .status(500)
      .json({ success: false, message: "Error on getting category" });
  }
};

// get  single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).json({
      success: true,
      message: "Successfully get single category",
      category,
    });
  } catch (error) {
    console.log("Error while getting single category".bgRed.white, error);
    res.status(500).json({
      success: false,
      message: "Something is wrong with single category",
      error,
    });
  }
};

// deleting a particular category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Category is deleted successfully",
    });
  } catch (error) {
    console.log("Error with delete category Api".bgRed.white, error);
    res.status(500).json({
      success: false,
      message: "Error while delete a particular category",
      error,
    });
  }
};
