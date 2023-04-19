import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProduct,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get product
router.get("/get-products", getProductController);

// updating product
router.put(
  "/update-product/pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get single product
router.get("/get-products/:slug", getSingleProductController);

// get photo product
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProduct);
export default router;
