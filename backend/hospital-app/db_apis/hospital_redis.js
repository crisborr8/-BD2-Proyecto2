const redisClient = require("../services/redis")

const insertLog = async (operacion, db) => {

    var datalog = {
        "operacion": operacion,
        "db": db,
        "datetime": new Date().toLocaleString()
    }

    await redisClient.rPush("logs", JSON.stringify(datalog))
}

module.exports = {
    insertLog
}