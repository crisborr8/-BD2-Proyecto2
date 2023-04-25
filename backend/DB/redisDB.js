const redis = require('redis');

const client = redis.createClient({
    database: 1,
    url: "redis://44.204.30.13:6379/1"
})

client.on('error', err => console.log('Redis client connection error', err));

client.connect();

module.exports = client;
//JSON.stringify(cadena)