const express=require("express");
const cartControllers=require("../controllers/cart.controller");
const authMiddleware=require("../middlewares/auth.middleware")

const router=express.Router();

router.post("/",authMiddleware.authenticate,cartControllers.addCart);
router.get("/",authMiddleware.authenticate,cartControllers.getCart);
router.put("/:id",authMiddleware.authenticate,cartControllers.updateQuantity);
router.delete("/:id",authMiddleware.authenticate,cartControllers.deleteProduct);
router.delete("/",authMiddleware.authenticate,cartControllers.deleteCart);

module.exports=router;