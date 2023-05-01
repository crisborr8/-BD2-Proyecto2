const cassandra = require('cassandra-driver');
const auth = require('../config/databases')
const {cassandra_auth} = require("../config/databases");

const client = new cassandra.Client({
    contactPoints: ['192.168.1.52'],
    localDataCenter: 'datacenter1',
    authProvider: cassandra_auth,
    protocolOptions: { port: 9042 },
    keyspace: 'bd2_py2',
    socketOptions: { readTimeout: 0 }
});

async function executeQuery(query, params) {
    const options = { prepare: true , fetchSize: 1000000 };
    return (await client.execute(query, params, options)).rows;
}






module.exports.executeQuery = executeQuery
