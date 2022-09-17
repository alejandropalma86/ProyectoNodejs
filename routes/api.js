'use strict'

const express = require ('express');
const { body } = require('express-validator');
const api = express.Router();
const path = require('path');

let WelcomeController = require('../controllers/welcome');
let AlumnosController = require('../controllers/alumnos');
let MaestrosController = require('../controllers/maestros');
let AuthController = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

//api.get("/", WelcomeController.welcome);
api.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});
api.get("/alumnos", AlumnosController.alumnos);
api.get("/alumno/:n_lista", AlumnosController.alumno);

api.post("/alumno", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);

api.put("/alumno/:n_lista", [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);

api.delete("/alumno/:n_lista", AlumnosController.delete_alumno);


api.get("/maestros", MaestrosController.maestros);
api.get("/maestro/:n_lista", MaestrosController.maestro);

api.post("/maestro", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('materia').not().isEmpty()
], MaestrosController.crear_maestro);

api.put("/maestro/:n_lista", userProtectUrl, [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('materia').not().isEmpty()
], MaestrosController.update_maestro);

api.delete("/maestro/:n_lista", userProtectUrl, MaestrosController.delete_maestro);

api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty(),
], AuthController.login);

api.post("/logout", userProtectUrl, AuthController.logout);

//Cualquier dirección que no exista lo dirige a un html
api.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/notFound.html'));
});

module.exports = api;