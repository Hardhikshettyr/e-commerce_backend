const jwt=require("jsonwebtoken");

async function authAdmin(req,res,next){
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized Access"
            })
        }

        const decode=jwt.verify(token,process.env.jwt_secret);
        if(decode.role!="admin"){
            return res.status(401).json({
                message:"Unauthorized Access"
            })
        }

        req.user=decode;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            message:"Unauthorized Access"
        })
    }
}

async function authUser(req,res,next){
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized Access"
            })
        }

        const decode=jwt.verify(token,process.env.jwt_secret);
        if(decode.role!="user"){
            return res.status(401).json({
                message:"Unauthorized Access"
            })
        }

        req.user=decode;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            message:"Unauthorized Access"
        })
    }
}

module.exports={authAdmin,authUser}