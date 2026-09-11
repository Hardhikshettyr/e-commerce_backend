const cartModel=require("../models/cart.model");
const productModel=require("../models/product.models");

async function addCart(req,res){
    const userId=req.user.id;
    const{productId,quantity}=req.body;

    const product=await productModel.findById(productId);
    if(!product){
        return res.status(404).json({
            message:"Product Doesnot exists"
        })
    }
    if(quantity<=0){
        return res.status(400).json({
            message:"Quantity must be greater than 0"
        })
    }
    if(quantity>product.stock){
        return res.status(400).json({
            message:"Insufficient stock"
        })
    }

    let cart=await cartModel.findOne({user:userId});

    if(!cart){
        cart=await cartModel.create({
            user:userId,
            items:[
                {
                    product:productId,
                    quantity,
                    price:product.price
                }
            ]
        })

        return res.status(201).json({
            message:"Product added to cart",
            cart
        })
    }

    const existingItem=cart.items.find(item=>item.product.toString()==productId);

    if(existingItem){
        const newQuantity=existingItem.quantity+quantity;
        if (newQuantity > product.stock) {
            return res.status(400).json({
                message: "Insufficient stock"
            });
        }
        existingItem.quantity=newQuantity;
    }else{
        cart.items.push({
            product:productId,
            quantity:quantity,
            price:product.price,
        })
    }

    await cart.save();

    res.status(200).json({
        message: "Product added to cart",
        cart
    });

    
}
async function getCart(req,res){
    const userId=req.user.id;
    const cart=await cartModel.findOne({user:userId}).populate("items.product");
    if(!cart){
        return res.status(401).json({
            message:"Cart doesn't exist"
        })
    }
    res.status(200).json({
        message:"cart displayed Successfully",
        cart
    })

}
async function updateQuantity(req,res){
    const userId=req.user.id;
    const productId=req.params.id;
    const quantity=req.body.quantity;
    const product=await productModel.findById(productId);
    if (!product) {
        return res.status(404).json({
        message: "Product doesn't exist"
        });
    }
    if(quantity<=0){
        return res.status(400).json({
            message:"Quantity must be greater than 0"
        })
    }
    if(quantity>product.stock){
        return res.status(400).json({
            message:"Insufficient stock"
        })
    }
    const cart=await cartModel.findOne({user:userId});
    if(!cart){
        return res.status(401).json({
            message:"Cart doesn't exist"
        })
    }
    const existingItem=cart.items.find(item=>item.product.toString()==productId);
    if(!existingItem){
        return res.status(404).json({
            message:"Product Doesnt exists in cart"
        })
    }
    if(existingItem){
        existingItem.quantity=quantity;
    }

    await cart.save();

    res.status(200).json({
        message: "Product quantity updated Successfully in cart",
        cart
    });
}
async function deleteProduct(req,res){
    const userId=req.user.id;
    const productId=req.params.id;

    const cart=await cartModel.findOne({user:userId});
    if(!cart){
        return res.status(401).json({
            message:"Cart doesn't Exist"
        })
    }
    const existingItem=cart.items.find(item=>item.product.toString()==productId);
    if(!existingItem){
        return res.status(404).json({
            message:"Product Doesnt exists in cart"
        })
    }else{
        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );
    }

    await cart.save();

    return res.status(200).json({
        message:"Product in cart removed Successfully",
        cart
    })

}
async function deleteCart(req,res){
    const userId=req.user.id;
    const cart=await cartModel.findOne({user:userId});
    if(!cart){
        return res.status(401).json({
            message:"cart Doesn't exist"
        })
    }
    cart.items=[];

    await cart.save();

    res.status(200).json({
        message:"Cart Emptyed Successfully"
    })

}

module.exports={addCart,getCart,updateQuantity,deleteProduct,deleteCart};