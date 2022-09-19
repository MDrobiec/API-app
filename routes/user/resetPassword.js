var express = require('express');
var config = require('../../db/config');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


let quertUpdate = `UPDATE user SET password_user = (?) WHERE id = (?);`;
const saltRounds = 10;

var routerPost = express.Router();

routerPost.post('/app/userResetPassword',function(req,res,next){
    if(!req.headers.authorization){
        res.status(403).json({error: 'Brak poprawnej autoryzacji'});
    }else{
        var str = req.get('Authorization');
        if(jwt.verify(str,'123',{algorithms: 'HS256'})){
            try{
                var payload = parseJwt(str);
                var id = payload.id;
                var password = req.body.password;
                bcrypt.hash(password, saltRounds, function(err, hash) {
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
                res.status(500).json(error);
            }
        }else{
            res.status(403).json({error: 'Brak poprawnej autoryzacji'});
        }
    }
  
})

module.exports = {
    routerPost
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}