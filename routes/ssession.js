var express = require('express');
var config = require('../db/config');

var routerGet = express.Router();
var routerGetAll = express.Router();
var routerPost = express.Router();
var routerUpdate = express.Router();

let queryGet = `SELECT * FROM ssession;`;

let queryGetOne = `SELECT * FROM ssession WHERE id = (?);`;

let queryPost = `INSERT INTO ssession (
id_user,date_session,token,date_in,date_exp) VALUES 
(?,?,?,?,?);`;

let queryUpdate = `UPDATE ssession SET id_user = (?),date_session = (?),
token = (?),date_in = (?),date_exp = (?),
WHERE id = (?);`;

routerGetAll.get('/app/allSSession',function(req,res,next){
        config.getConnection(function(err,conn){
            conn.query(queryGet, function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });
    })
 });

routerGet.get('/app/oneSSession',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerPost.post('/app/newSSession',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryPost,[req.body.id_user,
            req.body.date_session,req.body.token,req.body.date_in,
            req.body.date_exp], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerUpdate.post('/app/updateSSession',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryUpdate,[req.body.id_user,
            req.body.date_session,req.body.token,req.body.date_in,
            req.body.date_exp,req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

module.exports = {
    routerGet,
    routerGetAll,
    routerPost,
    routerUpdate
}
   
