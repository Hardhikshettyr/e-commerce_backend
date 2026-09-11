const userModel=require("../models/user.model");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function registerUser(req,res){
    try{

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
    }catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    
}
async function loginUser(req,res){
    try{
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
    }catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    
    
}
async function logoutUser(req,res){
    try{
        res.clearCookie("token");
        res.status(200).json({
        message:"User Logged Out Successfully"
    })
    }catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    
}
async function showMe(req,res){
    try{
        const id=req.user.id;
    const user=await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            message:"User Does not Exists"
        })
    }
    res.status(200).json({
        message:`${user.username} is loginned`,
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        }
    })
    }catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    
}
module.exports={registerUser,loginUser,logoutUser,showMe};