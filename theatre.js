"use strict";

var Q = require('q');

// Require dependencies
function prepare(scene) {
  ['interpreter', 'actors'].forEach(function(setting) {
    if (Array.isArray(scene[setting])) {
      var dependencies = [];
      scene[setting].forEach(function(dependency) {
        dependencies.push(require(dependency));
      });
      scene[setting] = dependencies;
    } else {
      scene[setting] = require(scene[setting]);
    }
  });
  return scene;
}

// Interpret each stories into a scenario
function interpret(scene) {
  var stories = scene.stories.map(function(story) {
    return Q.fcall(scene.interpreter, story);
  });
  return Q.all(stories).then(function() {
    scene.scenarios = arguments;
    return scene;
  });
}

module.exports.Theatre = {
  play: function(scene) {
    return Q.when(scene).then(prepare).then(interpret);
  }
};