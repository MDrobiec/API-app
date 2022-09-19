var express = require('express');
var config = require('../../db/config');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = 10;

let queryPost = `INSERT INTO user (
    name_user,surname,email,pin,password_user,device_id,phone,typ_user_id
    ) VALUES (
    ?,?,?,?,?,?,?,?
    );`;

var routerInsert = express.Router();

routerInsert.post('/app/newUser',function(req,res,next){
    if(!req.headers.authorization){
        res.status(403).json({error: 'Brak poprawnej autoryzacji'});
    }else{
        var str = req.get('Authorization');
        if(jwt.verify(str,'123',{algorithms: 'HS256'})){
            try{
                var name = req.body.name;
                var surname = req.body.surname;
                var email = req.body.email;
                var password = req.body.password;
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    config.getConnection(function(err,conn){
                        try{
                            conn.query(queryPost,[name,surname,email,'0000',hash,0,'000000000',0], function (error, results, fields) {
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
    routerInsert
}