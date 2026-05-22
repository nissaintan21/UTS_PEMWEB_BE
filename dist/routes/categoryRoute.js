import express from "express";
const router = express.Router();
import { getAllCategories, createCategory, getCategoryById, updateCategoryById, deleteCategoryById, } from "../controllers/categoryController.js";
router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);
export default router;
//# sourceMappingURL=categoryRoute.js.map