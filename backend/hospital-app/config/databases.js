const mysql = require('mysql2/promise')
const cassandra = require("cassandra-driver");
const redis = require("redis")

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || "3306",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || process.env.HR_PASSWORD,
    database: "BD2_P1",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 5,
    namedPlaceholders: true
});

const auth = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra')

const redisClient = redis.createClient({
    database: 1,
    url: "redis://44.211.212.12:6379/1"
})

module.exports.pool = pool
module.exports.cassandra_auth = auth
module.exports.redisClient = redisClient
