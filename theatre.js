"use strict";

var Q = require('q');

function prepare(scene) {
  ['interpreter', 'actors'].forEach(function(setting){
    scene[setting] = require(setting);
  });
  return scene;
}

module.exports.Theatre = {
  play: function(scene) {
    Q.when(scene).then(prepare);
  }
};