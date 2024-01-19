const { MongoClient } = require("mongodb");//4th step to require database here we connect with DB..
async function dbConnect(collection) {
    var url = "mongodb://127.0.0.1:27017";
    var client = new MongoClient(url);
    var connect = client.db("Ecommerce");
    if(collection=="orders"){
        var collection = connect.collection("orders");
        return collection;
      }
      else{
        var collection = connect.collection("Users");
        return collection;
    }
}

module.exports=dbConnect;//here we exports db..
