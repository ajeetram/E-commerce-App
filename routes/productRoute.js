import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
    braintreePaymentController,
    braintreeTokenController,
  createProductController,
  filterProductController,
  getAllProductController,
  getPhotoController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productDeleteController,
  productPerpageController,
  productUpdateController,
  searchProductController,
  similarProductController,
} from "../controller/productController.js";
import ExpressFormidable from "express-formidable";


const router = express.Router();



//routes
// create product route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

// get all product
router.get("/all-product", getAllProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

// get photos
router.get("/product-photo/:pid", getPhotoController);

//delete product

router.delete("/delete-product/:id", productDeleteController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  productUpdateController
);

// filter product
router.post("/filter-product", filterProductController);

// product count
router.get("/product-count", productCountController);

//product perpage

router.get("/product-list/:page", productPerpageController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/similar-product/:pid/:cid", similarProductController);

// category wise product
router.get("/product-category/:slug", productCategoryController);

//payment gateway
// token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn,braintreePaymentController)

export default router;
