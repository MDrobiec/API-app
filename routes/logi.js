var express = require('express');
var config = require('../db/config');

var routerGet = express.Router();
var routerGetAll = express.Router();
var routerPost = express.Router();
var routerDelete = express.Router();
var routerUpdate = express.Router();

let queryGet = `SELECT * FROM logi;`;

let queryGetOne = `SELECT * FROM logi WHERE id_user = (?);`;

let queryPost = `INSERT INTO logi (id_user,date_logi) VALUES 
(?,?);`;

let queryDelete = `DELETE FROM logi WHERE id = (?);`;

let queryUpdate = `UPDATE logi SET id_user = (?),
date_logi = (?) WHERE id = (?);`;

routerGetAll.get('/app/allLogi',function(req,res,next){
        config.getConnection(function(err,conn){
            conn.query(queryGet, function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });
    })
 });

routerGet.get('/app/oneLogi',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerPost.post('/app/newLogi',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryPost,[req.body.id_user,req.body.date_logi], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerDelete.delete('/app/deleteLogi',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryDelete,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerUpdate.post('/app/updateLogi',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryUpdate,[req.body.id_user,
            req.body.date_logi,req.body.id], function (error, results, fields) {
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
   
