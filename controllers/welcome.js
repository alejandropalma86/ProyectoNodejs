'use strict'

var controller = {
    welcome: function(req, res) {
        console.log("Get ejecutando en raíz");
        res.send("Mi Primer Debug ");
    }
};

module.exports = controller;