const userModel=require("../models/user.model");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function registerUser(req,res){
    const {username,email,password,role="user"}=req.body;
    const isuserexists=await userModel.findOne({
        $or:[
            {username},{email}
        ]
    });
    if(isuserexists){
        return res.status(409).json({
            message:"Username or Email Already Exists",
        })
    }
    const hash=await bcrypt.hash(password,10);
    const user=await userModel.create({
        username,
        email,
        password:hash,
        role
    })
    const token=jwt.sign({id:user._id, role:user.role},process.env.jwt_secret);
    res.cookie("token",token);
    res.status(201).json({
        message:"User registered Successfully",
        user
    })
}

async function loginUser(req,res){
    const{identifier,password}=req.body;
        const isuserexists=await userModel.findOne({
        $or:[
            {username:identifier},{email:identifier}
        ]
    })
    if(!isuserexists){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    }
    const ispasswordmatch=await bcrypt.compare(password,isuserexists.password);
    if(!ispasswordmatch){
         return res.status(401).json({
            message:"invalid Credentials"
        })
    }
    const token=jwt.sign({id:isuserexists._id, role:isuserexists.role},process.env.jwt_secret);
    res.cookie("token",token);
    res.status(200).json({
        message:"User Logined Successfully",
        user:{
            id:isuserexists.id,
            username:isuserexists.username,
            email:isuserexists.email,
            role:isuserexists.role
        }
    })
    
}

async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User Logged Out Successfully"
    })
}
module.exports={registerUser,loginUser,logoutUser};