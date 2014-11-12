"use strict";

var minimist = require('minimist');

var scene = require("./scene").Scene;
var theatre = require('./theatre').Theatre;

module.exports.Director = {
  execute: function(settings) {
    return scene.setUp(settings).then(theatre.play);
  }
};

// If run from the command line Director is executed with command line arguments.
if (require.main === module) {
  var args = process.argv.slice(2);
  var settings = minimist(args);
  module.exports.Director.execute(settings).done();
}