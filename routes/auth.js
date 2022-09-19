var express = require('express');
var config = require('../db/config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var routerGet = express.Router();

let queryGetPhone = `SELECT pin,device_id FROM user WHERE 
name_user = (?) and surname = (?);`;

let queryGetComputer = `SELECT password_user,device_id FROM user WHERE 
name_user = (?) and surname = (?);`;
var token;

routerGet.get('/app/login', function (req, res, next) {
    config.getConnection(function (err, conn) {
        if (req.body.devType == 0) {
            conn.query(queryGetPhone,[req.body.name,req.body.surname], function (error, results, fields) {
                if (error) throw error;
                if(results.length>0){
                    if(bcrypt.compareSync(results[0].pin,req.body.pin))
                    {
                        var payload = {
                            id : 0
                        }
                        token = jwt.sign(payload,'fsdfdsf',{algorithm:'HS256',expiresIn:'20min'});
                    }else{
                        res.status(403).json('False authenicated');
                    }
                }
            });
        } else if (req.body.devType == 1) {
            conn.query(queryGetComputer,[req.body.name,req.body.surname], function (error, results, fields) {
                if (error) throw error;
                if(results.length>0){
                    if(bcrypt.compareSync(results[0].pin,req.body.pin))
                    {
                        var payload = {
                            id : 0
                        }
                        token = jwt.sign(payload,'fsdfdsf',{algorithm:'HS256',expiresIn:'20min'});
                    }else{
                        res.status(403).json('False authenicated');
                    }
                }
            });
        }
    })
});

module.exports = {
    routerGet
}