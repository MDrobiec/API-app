var express = require('express');
var config = require('../db/config');

var routerGet = express.Router();
var routerGetAll = express.Router();
var routerPost = express.Router();
var routerDelete = express.Router();
var routerUpdate = express.Router();

let queryGet = `SELECT * FROM devices;`;

let queryGetOne = `SELECT * FROM devices WHERE id = (?);`;

let queryPost = `INSERT INTO devices (device_token) VALUES 
(?);`;

let queryDelete = `DELETE FROM devices WHERE id = (?);`;

let queryUpdate = `UPDATE devices SET device_token = (?) WHERE id = (?);`;

routerGetAll.get('/app/allDevices',function(req,res,next){
        config.getConnection(function(err,conn){
            conn.query(queryGet, function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });
    })
 });

routerGet.get('/app/oneDevices',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerPost.post('/app/newDevices',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryPost,[req.body.device_token], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerDelete.delete('/app/deleteDevices',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryDelete,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerUpdate.post('/app/updateDevices',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryUpdate,[req.body.device_token,req.body.id], function (error, results, fields) {
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
   
