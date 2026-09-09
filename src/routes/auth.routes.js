const express=require("express");
const authControllers=require("../controllers/auth.controller");
const authMiddleware=require("../middlewares/auth.middleware")
const router=express.Router();

router.post("/register",authControllers.registerUser);
router.post("/login",authControllers.loginUser);
router.post("/logout",authControllers.logoutUser);
router.get("/me",authMiddleware.authenticate,authControllers.showMe);
module.exports=router;