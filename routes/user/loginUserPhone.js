var express = require('express');
var config = require('../../db/config');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

let quertGet = `SELECT pin,id FROM user WHERE phone = (?);`;

var routerGet = express.Router();

routerGet.get('/app/loginPhone',function(req,res,next){
    try{
        var phone = req.body.phone;
        var pin = req.body.pin;
            config.getConnection(function(err,conn){
                try{
                    conn.query(quertGet,[phone], function (error, results, fields) {
                    if (error) throw error;
                       if(bcrypt.compareSync(pin, results[0].pin)){
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