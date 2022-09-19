var express = require('express');
var config = require('../../db/config');
var jwt = require('jsonwebtoken');

let getUser = `SELECT name_user,surname,email,phone FROM user WHERE id = (?);`;

var routerGet = express.Router();

routerGet.get('/app/myUser',function(req,res,next){
    if(!req.headers.authorization){
        res.status(403).json({error: 'Brak poprawnej autoryzacji'});
    }else{
        var str = req.get('Authorization');
        if(jwt.verify(str,'123',{algorithms: 'HS256'})){
            try{

            var payload = parseJwt(str);
            var id = payload.id;
                config.getConnection(function(err,conn){
                    conn.query(getUser,[id],function (error, results, fields) {
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

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}