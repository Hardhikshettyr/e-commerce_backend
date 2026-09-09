const express=require("express");
const productControllers=require("../controllers/product.controllers");
const authMiddleware=require("../middlewares/auth.middleware")
const multer=require("multer");

const upload=multer({storage:multer.memoryStorage()});
const router=express.Router();

router.post("/",authMiddleware.authAdmin,upload.single("image"),productControllers.createProducts);

module.exports=router;