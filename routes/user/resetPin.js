var express = require('express');
var config = require('../../db/config');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


let quertUpdate = `UPDATE user SET pin = (?) WHERE id = (?);`;
const saltRounds = 10;

var routerPost = express.Router();

routerPost.post('/app/userResetPin',function(req,res,next){
            try{
                var id = req.body.id;
                var pin = req.body.pin;
                
                bcrypt.hash(pin, saltRounds, function(err, hash) {

                    config.getConnection(function(err,conn){
                        try{
                            conn.query(quertUpdate,[hash,id], function (error, results, fields) {
                                if (error) throw error;
                                res.status(200).json(results);
                            });
                        }catch(error){
                            res.status(500).json(error);
                        }
                })
                });
            }catch(error){
                console.log(error);
                res.status(500).json(error);
            }
      
    
})

module.exports = {
    routerPost
}