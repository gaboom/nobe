"use strict";

var Q = require('q');

var scene = require("./scene");
var theatre = require('./theatre');

module.exports= function(settings) {
  return Q.when(settings)
    .then(scene)
    .then(theatre);
};