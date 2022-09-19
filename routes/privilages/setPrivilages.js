var express = require('express');
var config = require('../../db/config');

let postPrivilages = `INSERT INTO privilages (id_privilages,id_user)VALUES(?,?)`;

var routerPost = express.Router();

routerPost.post('/app/sPrivilages',function(req,res,next){
    try{
        var id_user = req.body.idUser;
        var id_privilages = req.body.sprivilages;
        config.getConnection(function(err,conn){
            conn.query(postPrivilages,[id_privilages,id_user], function (error, results, fields) {
                if (error) throw error;
                res.status(200).json(results);
            })
        })
    }catch(error){
        res.status(500).json(error);
    }
})

module.exports = {
    routerPost
}