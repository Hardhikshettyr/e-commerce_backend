const express=require("express");
const authControllers=require("../controllers/auth.controller");
const authMiddleware=require("../middlewares/auth.middleware")
const authVlaidator=require("../validators/auth.validator")
const validate=require("../middlewares/validation.middleware")
const router=express.Router();

router.post("/register",authVlaidator.registerValidator,validate,authControllers.registerUser);
router.post("/login",authVlaidator.loginValidator,validate,authControllers.loginUser);
router.post("/logout",authControllers.logoutUser);
router.get("/me",authMiddleware.authenticate,authControllers.showMe);
module.exports=router;