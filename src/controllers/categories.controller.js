const categoriesModel=require("../models/categories.models");

async function createCategories(req,res){
    const{name,description}=req.body
    const ifcategories=await categoriesModel.findOne({
        name
    })
    if(ifcategories){
        return res.status(409).json({
            message:"Category Already Exists"
        })
    }
    const category=await categoriesModel.create({
        name,description
    });

    res.status(201).json({
        message:"Category Created Successfully",
        category:{
            id:category.id,
            name:category.name,
            description:category.description
        }
    })
}
async function displayCategories(req,res){
    const categories=await categoriesModel.find();
    res.status(200).json({
        message:"Categories Displayed Successfully",
        categories,
    })
}
async function displayCategoryById(req,res){
    const id=req.params.id
    const category=await categoriesModel.findById(id);
    if(!category){
        return res.status(404).json({
            message:"Category Doesnot Exists"
        })
    }
    res.status(200).json({
        message:"The Category Displayed Successfully",
        category:{
            id:category.id,
            name:category.name,
            description:category.description
        }
    })

}
async function updateCategoryById(req,res){
    const id=req.params.id;
    const category=await categoriesModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    if(!category){
        return res.status(404).json({
            message:"Category Doesnot Exists"
        })
    }
    res.status(201).json({
        message:"Category Updated Successfully",
        category:{
            id:category.id,
            name:category.name,
            description:category.description,
        }
    })  
}
async function deleteCategoryById(req,res){
    const id=req.params.id;
    const category=await categoriesModel.findByIdAndDelete(id);
    if(!category){
        return res.status(404).json({
            message:"Category Doesnot Exists"
        })
    }
    res.status(201).json({
        message:"Category Deleted Successfully",
    })  
}

module.exports={createCategories,displayCategories,displayCategoryById,updateCategoryById,deleteCategoryById}