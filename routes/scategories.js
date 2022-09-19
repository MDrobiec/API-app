var express = require('express');
var config = require('../db/config');

var routerGet = express.Router();
var routerGetAll = express.Router();
var routerPost = express.Router();
var routerDelete = express.Router();
var routerUpdate = express.Router();

let queryGet = `SELECT * FROM scategories;`;

let queryGetOne = `SELECT * FROM scategories WHERE id = (?);`;

let queryPost = `INSERT INTO scategories (name_categories) VALUES 
(?);`;

let queryDelete = `DELETE FROM scategories WHERE id = (?);`;

let queryUpdate = `UPDATE scategories SET name_categories = (?) WHERE id = (?);`;

routerGetAll.get('/app/allSCategories',function(req,res,next){
        config.getConnection(function(err,conn){
            conn.query(queryGet, function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });
    })
 });

routerGet.get('/app/oneSCategories',function(req,res){
    config.getConnection(function(err,conn){
        conn.query(queryGetOne,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerPost.post('/app/newSCategories',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryPost,[req.body.name_categories], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerDelete.delete('/app/deleteSCategories',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryDelete,[req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})
});

routerUpdate.post('/app/updateSCategories',function(req,res,next){
    config.getConnection(function(err,conn){
        conn.query(queryUpdate,[req.body.name_categories,req.body.id], function (error, results, fields) {
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
   
