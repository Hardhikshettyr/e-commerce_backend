const express=require("express");
const productControllers=require("../controllers/product.controllers");
const authMiddleware=require("../middlewares/auth.middleware")
const validate=require("../middlewares/validation.middleware");
const productValidator=require("../validators/product.validator")
const multer=require("multer");

const upload=multer({storage:multer.memoryStorage()});
const router=express.Router();

router.post("/",productValidator.createProductValidator,validate,authMiddleware.authAdmin,upload.single("image"),productControllers.createProducts);
router.get("/",productValidator.productQueryValidator,validate,productControllers.getProducts)
router.get("/:id",productValidator.productIdValidator,validate,productControllers.getProductById)
router.put("/:id",productValidator.updateProductValidator,validate,authMiddleware.authAdmin,productControllers.updateProduct);
router.delete("/:id",productValidator.productIdValidator,validate,authMiddleware.authAdmin,productControllers.deleteProduct);

module.exports=router;