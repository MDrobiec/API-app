var express = require('express');
var config = require('../db/config');

var routerGet = express.Router();
var routerGetAll = express.Router();
var routerPost = express.Router();
var routerDelete = express.Router();
var routerUpdate = express.Router();

let queryGet = `SELECT * FROM message_notification;`;

let queryGetOne = `SELECT * FROM message_notification WHERE id = (?);`;

let queryPost = `INSERT INTO message_notification 
(date_message,description_message,id_type) VALUES 
(?,?,?);`;

let queryDelete = `DELETE FROM message_notification WHERE id = (?);`;

let queryUpdate = `UPDATE message_notification SET message_notification = (?),
date_message = (?),description_message = (?) WHERE id = (?);`;

routerGetAll.get('/app/allMessageNotification',function(req,res,next){
        config.getConnection(function(err,conn){
            conn.query(queryGet, function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });
    })
 });

routerGet.get('/app/oneMessageNotification',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerPost.post('/app/newMessageNotification',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryPost,[req.body.date_message,
            req.body.description_message,
            req.body.id_type], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerDelete.delete('/app/deleteMessageNotification',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryDelete,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerUpdate.post('/app/updateMessageNotification',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryUpdate,[req.body.date_message,
            req.body.description_message,
            req.body.id_type,req.body.id], function (error, results, fields) {
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
   
