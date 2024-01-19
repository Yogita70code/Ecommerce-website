const express=require("express");
const router=express.Router();//1st step to create router.
const indexController=require("../Controllers/index_controller");
var multer = require("multer");//3rs step to require multer in router next step is create folder dbConfig and file is config.js to connect database..
//below we take this from multer npm , and the alternate of multer npm is *busboy*......
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/HP/OneDrive/Desktop/chinu/nodejs/MongoDB/projectfrontend/public');//destination is a place/folder where it store the image.
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
const verify=require("../middleware/verify");

router.get("/",indexController.rootApi);
router.get("/users",indexController.allUserApi);
router.post("/register", upload.single(),indexController.registerApi);
router.post("/login", upload.single(),indexController.loginApi);
router.post("/update/:email", upload?.single(),indexController.updateApi);
router.post("/disableUser/:email",upload?.single(),indexController.disableApi);
router.post("/delete/:email", upload.single(),verify, indexController.deleteApi);
router.post("/enableUser/:email",upload.single(),indexController.enableApi);
router.get("/specificUser/:email",upload?.single(),indexController.SpecificUserApi);
router.get("/allUser",indexController.allUserApi);
router.post("/redirect", indexController.redirectApi);
router.post("/userUpload/:email",upload?.single("image"), indexController.imageUpload);//image is a field name of form ,it only post the image on particular field.(userDrtails.jsx)
//order api
router.post("/user/:email/orderBooked", upload?.single(),verify,indexController.orderBookedApi);
router.get("/user/:email/orderDetails", upload?.single(),indexController.orderDetailsApi);
router.post("/user/:email/forgetPassword", upload?.single(),verify,
indexController.forgetPasswordApi);
module.exports=router;//here we exports router ..