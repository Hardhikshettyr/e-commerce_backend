const express=require("express");
const authroutes=require("./routes/auth.routes");
const categoryroutes=require("./routes/categories.routes")
const cookieparser=require("cookie-parser")
const app=express();

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth",authroutes);
app.use("/api/categories",categoryroutes)

module.exports=app;