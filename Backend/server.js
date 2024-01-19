// var express = require("express");
// var app = express();
// var multer= require("multer");
// var upload = multer();
// app.get("/",function(req,res){
//     var email='bikendra7848@gmail.com';
//     var name="bikendra_singh";
//     res.send("hello all");
// });
// app.get("/users",function(req,res){
//     res.send("hello all user");
// });
// app.post("/register",upload.single(),function(req,res){
//     const { name,email,password,confirm_password }=req.body;
//     console.log("name,email,password,confirm_password",name,email,password,confirm_password);
//     if(name&&email&&password&&confirm_password)
//     {
//         if(password&&confirm_password)
//         {
//         res.send({massege:"registraction successfull",status: 1});
//         }
//         else
//         {
//             res.send({massege:"registraction successfull",status: 0});   
//         }
//     }
//     else{
//         res.send({massege:"password and conform password did not match",status: 0});
//     }
// });

// app.listen (8000,function(){
//     console.log("server listening on http://localhost:8000/");
// })





var express = require("express");
var app = express();
const indexRoute=require("./Routes/index_route");//2nd step to connect routs folder.
// const verify=require("./middleware/verify");
//CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server.
const cors =require("cors");
app.use(cors());
// const mongodb = require("mongodb");

app.use("/",indexRoute);

    app.listen(8000, function() {
    console.log("server listening on http://localhost:8000/");
});

