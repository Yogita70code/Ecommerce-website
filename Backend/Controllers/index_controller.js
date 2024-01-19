const dbConnect = require("../dbConfig/config"); //5th now after the db connect we get our API's(server.js)...
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rootApi = async function (req, res) {
  var email = "bikendra7848@gmail.com";
  var name = "bikendra_singh";
  res.send("hello all");
};
const allUserApi = function (req, res) {
  res.send("hello all user");
};
const registerApi = async function (req, res) {
  const { name, email, address, password, confirm_password, role } = req.body;
  console.log(
    "name,email,password,confirm_password",
    name,
    email,
    address,
    password,
    confirm_password,
    role
  );
  if (name && email && address && password && confirm_password && role) {
    if (password == confirm_password) {
      var Users = await dbConnect();
      // console.log("users", users);
      const hashPassword = await bcrypt.hash(password, 10);
      console.log("hashpassword", hashPassword);
      var findUser = await Users.findOne({ email: email });
      if (findUser) {
        res.send({ message: "user already registered", status: 0 });
      } else {
        var insertData = await Users.insertOne({
          name: name,
          email: email,
          address: address,
          password: hashPassword,
          confirm_password: confirm_password,
          status: 1, //by default active=1
          role: role, //
        });
        console.log("insertData", insertData);
        if (insertData) {
          res.send({ message: "registration successfull", status: 1 });
        } else {
          res.send({ message: "registration failed", status: 0 });
        }
      }
    } else {
      res.send({
        message: "password and confirm password did not match",
        status: 0,
      });
    }
  } else {
    res.send({ message: "please enter data", status: 0 });
  }
};
const loginApi = async function (req, res) {
  var { email, password } = req.body;
  if (email == "" && password == "") {
    res.send({ message: "please enter data", status: 1 });
  } else if (email && password) {
    const Users = await dbConnect();
    const usersData = await Users.findOne({ email: email });
    console.log("usersdata", usersData);
    if (usersData) {
      if (usersData.email == email) {
        bcrypt.compare(
          password,
          usersData.password,
          async function (err, result) {
            if (result) {
              const token = jwt.sign(
                { email: usersData.email },
                "Private_Key",
                { expiresIn: "1day", algorithm: "HS256" }
              );
              console.log("token", token);
              const userUpdated = await Users.updateOne(
                { email },
                { $set: { token: token } }
              );
              console.log("userUpdated", userUpdated);
              res.send({
                message: "login Successfully",
                status: 1,
                token: token,
                email: email,
              });
            } else {
              res.send({
                message: "plz enter valid email or password",
                status: 0,
              });
            }
          }
        );
      } else {
        res.send({ message: "email is not correct", status: 0 });
      }
    } else {
      res.send({
        message: "Login failed due to user not found please Register frist",
        status: 0,
      });
    }
  }
};
const updateApi = async function (req, res) {
  console.log("req.body", req.body);
  const email = req.params.email;
  const { name, address } = req.body;
  if (email) {
    if (name != "" && name != "undefined" && name != "null") {
      const Users = await dbConnect();
      const findUser = await Users.findOne({ email: email });
      if (findUser) {
        const userData = await Users.updateOne(
          { email: email },
          { $set: { name: name, address: address } }
        );
        if (userData) {
          res.send({ message: "Name update seccessfully", status: 1 });
        } else {
          res.send({ message: "user not updated", status: 1 });
        }
      } else {
        res.send({ message: "user not found", status: 1 });
      }
    } else {
      res.send({
        message: "should not be emply and undefined null",
        status: 0,
      });
    }
  } else {
    res.send({ message: "please enter email" });
  }
};

const disableApi = async function (req, res) {
  const email = req.params.email;
  const { status } = req.body;
  if (email) {
    if (status) {
      const Users = await dbConnect();
      const userData = await Users.findOne({ email });
      if (userData) {
        const updateUser = await Users.updateOne(
          { email: email },
          { $set: { status: status } }
        );
        if (updateUser) {
          res.send({ message: "user disable successfully", status: 1 });
        } else {
          res.send({ message: "user not disable successfully", status: 0 });
        }
      } else {
        res.send({ message: "user not found", status: 0 });
      }
    } else {
      res.send({ message: "Enter valid Email", status: 0 });
    }
  }
};
const deleteApi = async function (req, res) {
  // var { status } = req.body;
  var email = req.params.email;
  console.log("email", email);
  if (email) {
    const Users = await dbConnect();
    const userData = await Users.findOne({ email: email });
    console.log("userdata", userData);
    if (userData) {
      const deleteUser = await Users.deleteOne({ email: email });
      if (deleteUser) {
        res.send({ massege: "Users deleted succesfully", status: 1 });
      } else {
        res.send({ massege: "Users not deleted", status: 0 });
      }
    } else {
      res.send({ massege: "Users not found ", status: 0 });
    }
  } else {
    res.send({ massege: "Enter your valid email ", status: 0 });
  }
};
const enableApi = async function (req, res) {
  const email = req.params.email;
  const { status } = req.body;
  if (email) {
    if (status) {
      const Users = await dbConnect();
      const userData = await Users.findOne({ email });
      if (userData) {
        if (userData.status == 0) {
          const updateUser = await Users.updateOne(
            { email: email },
            { $set: { status: status } }
          );
          if (updateUser) {
            res.send({ message: "User Enabled successfully", status: 1 });
          } else {
            res.send({ message: "user not enabled", status: 0 });
          }
        } else {
          res.send({ message: "User already enable", status: 0 });
        }
      } else {
        res.send({ message: "User not found", status: 0 });
      }
    }
  } else {
    res.send({ message: "Enter Valid Email", status: 0 });
  }
};
const alluserApi = async function (req, res) {
  const Users = await dbConnect();
  const allUserData = await Users.find().toArray();
  if (allUserData) {
    res.send({
      message: "all user data fetched",
      status: 1,
      data: allUserData,
    });
  } else {
    res.send({ message: "all user data not fetched", status: 0 });
  }
};
const redirectApi = function (req, res) {
  res.redirect("/users");
};

const SpecificUserApi = async function (req, res) {
  const email = req.params.email;
  console.log("email", email);
  const Users = await dbConnect();
  const specificUser = await Users.findOne({ email });
  console.log("specificUser", specificUser);
  if (specificUser) {
    res.send({ message: "User data fetched", status: 1, data: specificUser });
  } else {
    res.send({ message: "User data not fetched", status: 0 });
  }
};

//image upload
const imageUpload = async function (req, res) {
  const email = req.params.email;
  console.log("email", email);
  console.log("req.file", req.file);
  const Users = await dbConnect();
  const specificUser = await Users.findOne({ email });
  console.log("specificUser", specificUser);
  if (specificUser) {
    const updateUser = await Users.updateOne(
      { email: email },
      { $set: { image: req.file.originalname } } //according to frontend request it upload the originalname of image to the server/backend.
      //"originalname" is a key:---Name of the file on the user's computer
    );
    if (updateUser) {
      res.send({
        message: "User image uploaded successfully",
        status: 1,
        data: specificUser,
      });
    } else {
      res.send({
        message: "User image not uploaded ",
        status: 0,
        data: specificUser,
      });
    }
  } else {
    res.send({ message: "User data not fetched", status: 0 });
  }
};
//order Api
const orderBookedApi = async function (req, res) {
  console.log("req.body", req.body);
  const email = req.params.email;
  const { address, price, Payment_mode, Delivery_date, orderId, name, status } =
    req.body;
  if (email) {
    if (email != "" && email != "undefined" && email != "null") {
      const orders = await dbConnect("orders");
      const insertData = await orders.insertOne({

        price: price,
        email: email,
        address,
        name,
        Payment_mode: Payment_mode,
        Delivery_date: Delivery_date,
        status,
        Product_id: 1,
        orderId: orderId,
      });
      if (insertData) {
        const transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "yogitanigam493@gmail.com",
            pass: "qkue utcc hdrs zxjq",
          },
        });
        const info = await transport.sendMail({
          from: '"yogitanigam493@gmail.com"', // sender address
          to: email, // list of receivers
          subject: "Order booked confirmation✔", // Subject line
          text: `Congratulation dear user,${email} your order booked successfully`, // plain text body
          html: `<h2>Congratulation dear user,${email} your order booked successfully </h2>`, // html body
        });

        console.log("Message sent: %s", info.messageId);

        res.send({ message: "order placed successfully", status: 1 });
      } else {
        res.send({ message: "something went wrong", status: 1 });
      }
    }
  } else {
    res.send({ message: "please enter email" });
  }
};
//order TableView
const orderDetailsApi = async function (req, res) {
  console.log("req.body", req.body);
  const email = req.params.email;
  if (email) {
    if (email != "" && email != "undefined" && email != "null") {
      const orders = await dbConnect("orders");
      const orderFind = await orders.find({ email }).toArray();
      console.log("orderFind", orderFind);
      if (orderFind) {
        res.send({
          message: "order fetched successfully",
          status: 1,
          orderFind: orderFind,
        });
      } else {
        res.send({ message: "something went wrong", status: 0 });
      }
    }
  } else {
    res.send({ message: "please enter email" });
  }
};

const forgetPasswordApi = async function (req, res) {
  const email = req.params.email;
  if (email) {
    if (email != "" && email != "undefined" && email != "null") {
      var Users = await dbConnect();
      const insertData = await Users.insertOne({
        password: password,
        confirm_password: confirm_password,
      });
      if (insertData) {
        const transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,

          auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: email,
            pass: "qkue utcc hdrs zxjq",
          },
        });
        const info = await transport.sendMail({
          from: email, // sender address
          to: "bikendra7848@gmail.com", // list of receivers
          subject: "Order booked confirmation✔", // Subject line
          text: `Congratulation dear user,${email} your order booked successfully`, // plain text body
          html: `<h2>Congratulation dear user,${email} your order booked successfully </h2>`, // html body
        });

        console.log("Message sent: %s", info.messageId);

        res.send({ message: " successfully", status: 1 });
      }
    } else {
      res.send({ message: "something went wrong", status: 1 });
    }
  }else{
    res.send({message: "this is not Found",status: 0});
  }
};

module.exports = {
  SpecificUserApi,
  redirectApi,
  alluserApi,
  enableApi,
  deleteApi,
  disableApi,
  updateApi,
  loginApi,
  registerApi,
  allUserApi,
  rootApi,
  imageUpload,
  orderBookedApi,
  orderDetailsApi,
  forgetPasswordApi,
}; //Here we connect our all calling api's in a variable...
