'use strict'

const jwt2 = require ('jsonwebtoken');

let Sessions = require('../models/sessions');
let config = require('../configs/config');

const middlewares = { 
    userProtectUrl: function(req, res, next) {
        const token = req.headers['access-token'];
        let tokenok = Sessions;
        let ok = tokenok.jwt;
        console.log("Probando valor token");
        console.log(ok);
        if(token) {
            jwt2.verify(token, config.llave, (err, decoded) => {
                if(err) {
                    return res.status(403).json({message: "Token invalido"});
                } else {
                    req.decoded = decoded;

                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec( (err, session) => {
                        if(err) return res.status(500).send({message: "Error al devolver los datos"});
                        if(!session) return res.status(404).send({message: "Los datos de autenticación no son válidos"});
                    });
                    next();
                }
            });
        } else {
            res.status(403).send({
                message: "Token no valido"
            });
        }
    }
};

module.exports =middlewares;