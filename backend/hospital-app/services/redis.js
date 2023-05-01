const db = require('../config/databases').redisClient

db.on('error', err => console.log('Redis client connection error' , err))

db.connect().then(() => console.log("Conexion a REDIS establecida"))


module.exports = db;