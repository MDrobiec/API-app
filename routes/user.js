var express = require('express');
var config = require('../db/config');

var routerGet = express.Router();
var routerGetAll = express.Router();
var routerPost = express.Router();
var routerDelete = express.Router();
var routerUpdate = express.Router();

let queryGet = `SELECT * FROM user;`;

let queryGetOne = `SELECT * FROM user WHERE id = (?);`;

let queryPost = `INSERT INTO user (
name_user,surname,email,pin,password_user,device_id,phone,typ_user_id
) VALUES (
?,?,?,?,?,?,?,?
);`;

let queryDelete = `DELETE FROM user WHERE id = (?);`;

let queryUpdate = `UPDATE user SET name_user = (?),surname = (?),
email = (?),pin = (?),password_user = (?),device_id = (?),
phone = (?),typ_user_id = (?) WHERE id = (?);`;

routerGetAll.get('/app/allUser',function(req,res,next){
        config.getConnection(function(err,conn){
            try{
                conn.query(queryGet, function (error, results, fields) {
                    if (error) throw error;
                    res.status(200).json(results);
                });
            }catch(error){
                console.log(error)
            }
    })
 });

routerGet.get('/app/oneUser',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerPost.post('/app/newUsers',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryPost,[req.body.name,req.body.surname,req.body.email,
        req.body.pin,req.body.password,req.body.device_id,req.body.phone,
        req.body.typ_user_id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerDelete.delete('/app/deleteUser',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryDelete,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerUpdate.post('/app/updateUser',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryUpdate,[req.body.name,req.body.surname,req.body.email,
        req.body.pin,req.body.password,req.body.device_id,req.body.phone,
        req.body.typ_user_id,req.body.id], function (error, results, fields) {
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
   
