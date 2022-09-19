var express = require('express');
var config = require('../db/config');

var routerGet = express.Router();
var routerGetAll = express.Router();
var routerPost = express.Router();
var routerDelete = express.Router();
var routerUpdate = express.Router();

let queryGet = `SELECT * FROM privilages;`;

let queryGetOne = `SELECT * FROM privilages WHERE id_user = (?);`;

let queryPost = `INSERT INTO privilages (id_sprivilages,id_user) VALUES 
(?,?);`;

let queryDelete = `DELETE FROM privilages WHERE id = (?);`;

let queryUpdate = `UPDATE privilages SET id_sprivilages = (?),
id_user = (?) WHERE id = (?);`;

routerGetAll.get('/app/allPrivilages',function(req,res,next){
        config.getConnection(function(err,conn){
            conn.query(queryGet, function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });
    })
 });

routerGet.get('/app/userPrivilages',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id_user], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerPost.post('/app/newPrivilages',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryPost,[req.body.id_sprivilages,req.body.id_user], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerDelete.delete('/app/deletePrivilages',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryDelete,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerUpdate.post('/app/updatePrivilages',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryUpdate,[req.body.id_sprivilages,
            req.body.id_user,req.body.id], function (error, results, fields) {
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
   
