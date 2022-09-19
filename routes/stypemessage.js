var express = require('express');
var config = require('../db/config');

var routerGet = express.Router();
var routerGetAll = express.Router();
var routerPost = express.Router();
var routerDelete = express.Router();
var routerUpdate = express.Router();

let queryGet = `SELECT * FROM stypemessage;`;

let queryGetOne = `SELECT * FROM stypemessage WHERE id = (?);`;

let queryPost = `INSERT INTO stypemessage (typ_message) VALUES 
(?);`;

let queryDelete = `DELETE FROM stypemessage WHERE id = (?);`;

let queryUpdate = `UPDATE stypemessage SET typ_message = (?) 
WHERE id = (?);`;

routerGetAll.get('/app/allSTypMessage',function(req,res,next){
        config.getConnection(function(err,conn){
            conn.query(queryGet, function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });
    })
 });

routerGet.get('/app/oneSTypMessage',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerPost.post('/app/newSTypMessage',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryPost,[req.body.typ_message], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerDelete.delete('/app/deleteSTypMessage',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryDelete,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerUpdate.post('/app/updateSTypMessage',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryUpdate,[req.body.typ_message,req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});


module.exports = {
    routerGet,
    routerGetAll,
    routerPost,
    routerDelete,
    routerUpdate
}
   
