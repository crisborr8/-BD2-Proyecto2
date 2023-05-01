const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const webServerConfig = require('../config/web_server');

const routerHotel = require('../routers/hospital')

let httpServer;
const app = express();


const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
    // revive ISO 8601 date strings to instances of Date
    if (typeof value === 'string' && iso8601RegExp.test(value)) {
        return new Date(value);
    } else {
        return value;
    }
}

const errorHandler = function (error, req, res, next) {
    //TODO logger
    console.log( `errorHandler:  ${error.message}`) // log the error
    const status = error.statusRes || 500
    res.status(status).send( {status : false, msg: error.msg, error: error.toString() })
}

//plugins para express
app.use(cors({origin: '*'}));
app.use(morgan('combined'));


app.use(express.json({
    reviver: reviveJson
}));

app.use('/', routerHotel)

app.use(errorHandler)



function initialize(){
    return new Promise(((resolve, reject) => {
        httpServer = http.createServer(app);


        httpServer.listen(webServerConfig.port, err => {
            if (err){
                reject(err);
            }
            console.log(`Servidor escuchando en localhost: ${webServerConfig.port}`);
            resolve();
        });
    }));
}

function close (){
    return new Promise((resolve, reject) => {
        httpServer.close((error) => {
            if (error) {
                reject(error)
            }
            resolve();
        });
    });

}

module.exports.initialize = initialize;
module.exports.close = close;
module.exports.app = app;

