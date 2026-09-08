const mongoose=require("mongoose");

async function connectDb(){
    try{
         await mongoose.connect(process.env.mongo_uri);
         console.log("DB Connected")
    }catch(err){
        console.error(err);
    }
   
}

module.exports=connectDb;