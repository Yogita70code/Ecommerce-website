const jwt=require('jsonwebtoken');
const verify=async(req,res,next)=>{
    // const token = req.body.token;
    const token =req.headers.authorization;
    if(token){
        jwt.verify(token,"Private_Key",function(err,decode){
            if(err){
                console.log("token is not available",err);
            }
            else{
                console.log("success token",decode);
                next();
            }
        })
    }
    else{
        res.send({message:"token not found",status:0});
    }
}
 module.exports=verify;

