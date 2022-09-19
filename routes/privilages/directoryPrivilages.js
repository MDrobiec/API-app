var express = require('express');
var config = require('../../db/config');

let getDPrivilages = `SELECT * FROM sprivilages;`;
let postDPrivilages = `INSERT INTO sprivilages (name_privilages,type)VALUES(?,?);`;

var routerGet = express.Router();
var routerPost = express.Router();

routerGet.get('/app/sDPrivilages',function(req,res,next){
    if(!req.headers.authorization){
        res.status(403).json({error: 'Brak poprawnej autoryzacji'});
    }else{
        var str = req.get('Authorization');
        if(jwt.verify(str,'123',{algorithms: 'HS256'})){
            try{
                config.getConnection(function(err,conn){
                    conn.query(getDPrivilages, function (error, results, fields) {
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

routerPost.post('/app/sDPrivilages',function(req,res,next){
    if(!req.headers.authorization){
        res.status(403).json({error: 'Brak poprawnej autoryzacji'});
    }else{
        var str = req.get('Authorization');
        if(jwt.verify(str,'123',{algorithms: 'HS256'})){
            try{
                var namePrivilages = req.body.namePrivilages;
                var type = req.body.type;
                config.getConnection(function(err,conn){
                    conn.query(postDPrivilages,[namePrivilages,type], function (error, results, fields) {
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
    routerGet,
    routerPost
}