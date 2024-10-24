import express from "express";
import { protect, admin } from "../middlewares/Auth.js";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../Controllers/CategoriesController.js";

const router = express.Router();

// ********** PUBLIC ROUTES **********
router.get("/", getCategories)


// ********** ADMIN ROUTES **********
router.post("/", protect, admin, createCategory)
router.put("/:id", protect, admin, updateCategory)
router.delete("/:id", protect, admin, deleteCategory)



export default router;