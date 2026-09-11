const express=require("express");
const orderControllers=require("../controllers/orders.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const orderValidator=require("../validators/order.validator");
const validate=require("../middlewares/validation.middleware")
const router=express.Router();

router.post("/",orderValidator.placeOrderValidator,validate,authMiddleware.authenticate,orderControllers.placOrder),
router.get("/my",authMiddleware.authenticate,orderControllers.getMyOrders),
router.get("/my/:id",orderValidator.orderIdValidator,validate,authMiddleware.authenticate,orderControllers.getMyOrderById);
router.get("/",authMiddleware.authAdmin,orderControllers.getAllOrders);
router.get("/:id",orderValidator.orderIdValidator,validate,authMiddleware.authAdmin,orderControllers.getOrderById);
router.put("/:id/status",orderValidator.updateOrderStatusValidator,validate,authMiddleware.authAdmin,orderControllers.updateOrderStatus)

module.exports=router;