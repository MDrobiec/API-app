var express = require('express');
var config = require('../db/config');

var routerGet = express.Router();
var routerGetConsultant = express.Router();
var routerGetAll = express.Router();
var routerPost = express.Router();
var routerDelete = express.Router();
var routerUpdate = express.Router();

let queryGet = `SELECT * FROM notification;`;

let queryGetOne = `SELECT * FROM notification WHERE id_user = (?);`;

let queryPost = `INSERT INTO notification 
(date_notification,date_max,id_user,id_user_realizing,
id_status,archive,id_category,name_notification,description_notification) VALUES 
(?,?,?,?,?,?,?,?,?);`;

let queryDelete = `DELETE FROM notification WHERE id = (?);`;

let queryUpdate = `UPDATE notification SET date_notification = (?),
date_max = (?),SET id_user = (?),
id_user_realizing = (?),SET id_status = (?),
archive = (?),SET id_category = (?),
name_notification = (?),SET description_notification = (?) WHERE id = (?);`;

routerGetAll.get('/app/allNotification',function(req,res,next){
        config.getConnection(function(err,conn){
            conn.query(queryGet, function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });
    })
 });

routerGet.get('/app/userNotification',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id_user], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerGetConsultant.get('/app/consultantNotification',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id_user_realizing], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerPost.post('/app/newNotification',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryPost,[req.body.date_notification,req.body.date_max,
            req.body.id_user,req.body.id_user_realizing,
            req.body.id_status,req.body.archive,
            req.body.id_category,req.body.name_notification,
            req.body.description_notification], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerDelete.delete('/app/deleteNotification',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryDelete,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerUpdate.post('/app/updateNotification',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryUpdate,[req.body.date_notification,req.body.date_max,
            req.body.id_user,req.body.id_user_realizing,
            req.body.id_status,req.body.archive,
            req.body.id_category,req.body.name_notification,
            req.body.description_notification,req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});


module.exports = {
    routerGet,
    routerGetConsultant,
    routerGetAll,
    routerPost,
    routerDelete,
    routerUpdate
}
   
