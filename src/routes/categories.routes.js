const express=require("express");
const categoriesControllers=require("../controllers/categories.controller");
const authmiddleware=require("../middlewares/auth.middleware")
const router=express.Router();


router.post("/",authmiddleware.authAdmin,categoriesControllers.createCategories);
router.get("/",categoriesControllers.displayCategories);
router.get("/:id",categoriesControllers.displayCategoryById);
router.put("/:id",authmiddleware.authAdmin,categoriesControllers.updateCategoryById);
router.delete("/:id",authmiddleware.authAdmin,categoriesControllers.deleteCategoryById);
module.exports=router;