var mysql = require('mysql');
var mySql = require('../db/connectionPool');
var config = require('../db/config');

async function ExecuteProcedureParameter(nameProcedure) {
    try {
        let sqlPool = await mySql.GetCreateIfNotExistPool(config);
        let request = new mysql.Request(sqlPool)
        let operation = await request.execute(nameProcedure)
        return operation.recordset;
    } catch (error) {
        return error;
    }
}

module.exports = {
    ExecuteProcedureParameter : ExecuteProcedureParameter
}