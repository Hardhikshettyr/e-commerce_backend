const mongoose=require("mongoose");

const categoriesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    }
})

const categoriesModel=mongoose.model("categories",categoriesSchema);
module.exports=categoriesModel;