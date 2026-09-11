const orderModel=require("../models/order.model");
const productModel=require("../models/product.models");
const cartModel=require("../models/cart.model");

async function placOrder(req,res){
    const userId=req.user.id;
    const {address}=req.body;

    if(!address ||
        !address.street||
        !address.city ||
        !address.state||
        !address.pincode
    ){
        return res.status(400).json({
            message: "Complete address is required"
        });
    }

    const cart=await cartModel.findOne({user:userId});

    if(!cart){
        return res.status(404).json({
            message:"Cart doesn't exist"
        })
    }

    if(cart.items.length===0){
        return res.status(400).json({
            message:"Cart is empty"
        })
    }

    const orderItems=[];
    let total=0;

    for(const item of cart.items){
        const product=await productModel.findById(item.product);

        if (!product) {
            return res.status(404).json({
                message: "One or more products no longer exist"
            });
        }

        if (item.quantity > product.stock) {
            return res.status(400).json({
                message: `Insufficient stock for ${product.name}`
            });
        }

        const price=product.price;

        let itemPrice=price*item.quantity;

        total+=itemPrice;

        orderItems.push({
            product:product._id,
            quantity:item.quantity,
            price,
        })

    }
    const order = await orderModel.create({
        user: userId,
        items: orderItems,
        total: total,
        status: "pending",
        address: address
    });

    for(const item of cart.items){
        await productModel.findByIdAndUpdate(
            item.product,
            {
                $inc:{
                    stock:-item.quantity
                }
            }
        );
            
    }
    cart.items=[];
    await cart.save();

    return res.status(201).json({
        message: "Order placed successfully",
        order
    });   
}
async function getMyOrders(req,res){
    const userId = req.user.id;

    const orders = await orderModel
        .find({ user: userId })
        .populate("items.product");

    if (orders.length === 0) {
        return res.status(404).json({
            message: "No orders found"
        });
    }

    return res.status(200).json({
        message: "Your orders displayed successfully",
        orders
    });
}
async function getMyOrderById(req,res){
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await orderModel
        .findOne({
            _id: orderId,
            user: userId
            })
        .populate("items.product");

    if (!order) {
        return res.status(404).json({
            message: "Order doesn't exist"
        });
    }

    return res.status(200).json({
        message: "Order displayed successfully",
        order
    });
}
async function getAllOrders(req,res){
    const orders = await orderModel
        .find()
        .populate("user", "username email")
        .populate("items.product");

    if (orders.length === 0) {
        return res.status(404).json({
            message: "No orders found"
        });
    }

    return res.status(200).json({
        message: "All orders displayed successfully",
        orders
    });
}
async function getOrderById(req,res){
    const orderId = req.params.id;

    const order = await orderModel
        .findById(orderId)
        .populate("user", "username email")
        .populate("items.product");

    if (!order) {
        return res.status(404).json({
            message: "Order doesn't exist"
        });
    }

    return res.status(200).json({
        message: "Order displayed successfully",
        order
    });
}
async function updateOrderStatus(req,res){
    const orderId = req.params.id;
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({
                message: "Order doesn't exist"
            });
        }

        order.status = status;

        await order.save();

        return res.status(200).json({
            message: "Order status updated successfully",
            order
        });
}

module.exports={placOrder,getMyOrders,getMyOrderById,getAllOrders,getOrderById,updateOrderStatus}