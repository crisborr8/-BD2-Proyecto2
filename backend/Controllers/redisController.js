const redisClient = require("../DB/redisDB");

const insertLog = async (consulta, bd) => {
    var dataLog = {
        "consulta": consulta,
        "db": bd,
        "datetime": new Date().toLocaleString()
    }

    await redisClient.rPush("logs", JSON.stringify(dataLog))
}


module.exports = {
    insertLog
}