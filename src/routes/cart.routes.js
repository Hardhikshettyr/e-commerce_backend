const express=require("express");
const cartControllers=require("../controllers/cart.controller");
const authMiddleware=require("../middlewares/auth.middleware")
const validate=require("../middlewares/validation.middleware");
const cartValidator=require("../validators/cart.validator");
const router=express.Router();

router.post("/",cartValidator.addCartValidator,validate,authMiddleware.authenticate,cartControllers.addCart);
router.get("/",authMiddleware.authenticate,cartControllers.getCart);
router.put("/:id",cartValidator.updateQuantityValidator,validate,authMiddleware.authenticate,cartControllers.updateQuantity);
router.delete("/:id",cartValidator.cartProductIdValidator,validate,authMiddleware.authenticate,cartControllers.deleteProduct);
router.delete("/",authMiddleware.authenticate,cartControllers.deleteCart);

module.exports=router;