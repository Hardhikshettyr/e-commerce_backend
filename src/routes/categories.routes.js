const express=require("express");
const categoriesControllers=require("../controllers/categories.controller");
const authmiddleware=require("../middlewares/auth.middleware")
const categoryValidator=require("../validators/category.validator")
const validate=require("../middlewares/validation.middleware");
const router=express.Router();


router.post("/",categoryValidator.createCategoryValidator,validate,authmiddleware.authAdmin,categoriesControllers.createCategories);
router.get("/",categoriesControllers.displayCategories);
router.get("/:id",categoryValidator.categoryIdValidator,validate,categoriesControllers.displayCategoryById);
router.put("/:id",categoryValidator.updateCategoryValidator,validate,authmiddleware.authAdmin,categoriesControllers.updateCategoryById);
router.delete("/:id",categoryValidator.categoryIdValidator,validate,authmiddleware.authAdmin,categoriesControllers.deleteCategoryById);
module.exports=router;