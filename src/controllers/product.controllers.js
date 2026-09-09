const productModel=require("../models/product.models");
const categoriesModel=require("../models/categories.models");
const userModel=require("../models/user.model");
const uploadFile=require("../services/storage.services")

async function createProducts(req,res){
    const {name,description,price,stock,category}=req.body
    const iscategoryexists=await categoriesModel.findOne({
        name:category
    })
    if(!iscategoryexists){
        return res.status(401).json({
            message:"Category doesn't exists"
        })
    }

    const image=req.file;
    const id=req.user.id;

    const result=await uploadFile(image.buffer.toString("base64"));
    const user=await userModel.findById(id);
    if(!user){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    const product=await productModel.create({
        name,
        description,
        price,
        stock,
        image:result.url,
        category:iscategoryexists.id,
        seller:req.user.id
    });
    res.status(201).json({
        message:"Product created Successfully",
        product:{
            name:product.name,
            description:product.description,
            price:product.price,
            stock:product.stock,
            iamge:product.image,
            category:product.category,
            seller:product.seller
        }
    })
}

module.exports={createProducts};