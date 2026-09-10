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
async function getProducts(req,res){
    const{search,category,minPrice,maxPrice,sort,page=1,limit=10}=req.query;
    let filter={};

    if(search){
        filter.name={
            $regex:search,
            $options:"i",
        };
    }

    if(category){
        filter.category=category;
    }

    if(minPrice || maxPrice){
        filter.price={};

        if(minPrice){
            filter.price.$gte=Number(minPrice);
        }
        if(maxPrice){
            filter.price.$lte=Number(maxPrice);
        }
    }

    const pageNumber=Number(page);
    const limitNumber=Number(limit);
    const skip=(pageNumber-1)*limitNumber;

    let sortOption={};

    if(sort==="price_asc"){
        sortOption.price=1;
    }else if(sort==="price_desc"){
        sortOption.price=-1;
    }else if(sort==="name_asc"){
        sortOption.name=1;
    }else if(sort==="name_desc"){
        sortOption.name=-1
    }else{
        sortOption.name=1;
    }

    const products=await productModel.find(filter)
    .populate("category" ,"name")
    .populate("seller","username email")
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber)

    const totalProducts=await productModel.countDocuments(filter);

    res.status(200).json({
        message:"Products fetched Successfully",
        products,
        pagination:{
            currentPage:pageNumber,
            limit:limitNumber,
            totalProducts,
            toatlPages:Math.ceil(totalProducts/limitNumber)
        }
    });
    
}
async function getProductById(req,res){
    const id=req.params.id;
    const product=await productModel.findById(id);
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
    }
    res.status(200).json({
        message:"Product displayed Successfully",
        product
    })
}
async function updateProduct(req,res){
    const _id=req.params.id
    const seller=req.user.id
    const product=await productModel.findOneAndUpdate(
        {_id,seller},
        req.body,
        {returnDocument: "after"}
    )
    if(!product){
        return res.status(404).json({
            message:"product not found or You are not authorized"
        })
    }
    res.status(200).json({
        message:"product updated Successfully",
        product,
    })
}
async function deleteProduct(req,res){
    const _id=req.params.id
    const seller=req.user.id
    const product=await productModel.findOneAndDelete({
        _id,seller
    })
    if(!product){
        return res.status(404).json({
            message:"product not found or You are not authorized"
        })
    }
    res.status(200).json({
        message:"product deleted Successfully",

    })
}

module.exports={createProducts,getProducts,getProductById,updateProduct,deleteProduct};