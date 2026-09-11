const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            price:{
                type:Number,
                required:true
            },
        }
    ],
    total:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","processing","shipped","delivered","cancelled"],
        default:"pending",
        required:true
    },
    address: {
        street: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        }
    }
},{timestamps: true}
)

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;