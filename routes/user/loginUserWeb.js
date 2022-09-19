var express = require('express');
var config = require('../../db/config');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


let quertGet = `SELECT password_user,id FROM user WHERE email = (?);`;

var routerGet = express.Router();

routerGet.post('/app/loginWeb',function(req,res,next){
    try{
        var email = req.body.email;
        var password = req.body.password;
        console.log(req.body.email);
        console.log(req.body.password);

            config.getConnection(function(err,conn){
                try{
                    conn.query(quertGet,[email], function (error, results, fields) {
                        if (error) throw error;
                       if(bcrypt.compareSync(password, results[0].password_user)){
                        var payload = {
                            id : results[0].id
                        }
                        var token = jwt.sign(payload,'123',{algorithm:'HS256',expiresIn:'20min'})
                        res.status(200).json(token);
                        }else{
                            var token = '0'
                            res.status(500).json(token);
                        }
                    });
                }catch(error){
                    res.status(500).json(error);
                }
        })
    }catch(error){
        res.status(500).json(error);
    }
})

module.exports = {
    routerGet
}