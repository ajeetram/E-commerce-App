import express from "express";
import {requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import { categoryUpdateController, createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController } from "../controller/categoryController.js";
const router = express.Router();

//routes

//create-category route
router.post("/create-category",requireSignIn,isAdmin,createCategoryController)

//update-category route
router.put("/update-category/:id",requireSignIn,isAdmin,categoryUpdateController)

// get all category route
router.get("/getAll-category", getAllCategoryController);

// get single category route
router.get("/single-category/:slug", getSingleCategoryController)

//delete category route
router.delete("/delete-category/:id",requireSignIn,isAdmin, deleteCategoryController )

export default router