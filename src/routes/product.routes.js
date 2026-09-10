const express=require("express");
const productControllers=require("../controllers/product.controllers");
const authMiddleware=require("../middlewares/auth.middleware")
const multer=require("multer");

const upload=multer({storage:multer.memoryStorage()});
const router=express.Router();

router.post("/",authMiddleware.authAdmin,upload.single("image"),productControllers.createProducts);
router.get("/",productControllers.getProducts)
router.get("/:id",productControllers.getProductById)
router.put("/:id",authMiddleware.authAdmin,productControllers.updateProduct);
router.delete("/:id",authMiddleware.authAdmin,productControllers.deleteProduct);

module.exports=router;