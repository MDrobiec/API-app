var express = require('express');
var config = require('../../db/config');
var jwt = require('jsonwebtoken');

let getUser = `SELECT * FROM user;`;

var routerGet = express.Router();

routerGet.get('/app/user',function(req,res,next){
    if(!req.headers.authorization){
        res.status(403).json({error: 'Brak poprawnej autoryzacji'});
    }else{
        var str = req.get('Authorization');
        if(jwt.verify(str,'123',{algorithms: 'HS256'})){
            try{
                config.getConnection(function(err,conn){
                    conn.query(getUser, function (error, results, fields) {
                        if (error) throw error;
                        res.status(200).json(results);
                    })
                })
            }catch(error){
                res.status(500).json(error);
            }
        }else{
            res.status(403).json({error: 'Brak poprawnej autoryzacji'});
        }
    }
})

module.exports = {
    routerGet
}