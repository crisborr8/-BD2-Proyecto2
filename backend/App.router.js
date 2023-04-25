var Router = require('express').Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


const redisController = require("./Controllers/redisController")
const redisClient = require("./DB/redisDB");

Router.get("/showLogs", async(req, res) => {
    redisController.insertLog(1, "MYSQL")  // agregando log de prueba
    //res.send({"message": "mensaje de prueba"});
    var response = await redisClient.lRange("logs", 0, -1)
    var object = [];
    response.forEach((val) => {
        object.push(JSON.parse(val))
    })
    //console.log(response)
    res.send(object);
})

module.exports = Router;