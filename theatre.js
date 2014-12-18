"use strict";

var Q = require('q');

// Require dependencies
function prepare(scene) {
  ['interpreter', 'actors', 'observers'].forEach(function(setting) {
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
  var scenarioResources = scene.scenarios.map(function(scenarioResource) {
    return Q.fcall(scene.interpreter, scenarioResource).catch(function(error){
	    throw new Error('Interpretation of ' + scenarioResource + ' failed because ' + (error && error.stack ? '\n' + error.stack : error));
    });
  });
  return Q.all(scenarioResources).then(function(scenarios) {
    console.log(JSON.stringify(scenarios, null, ' '));
  });
}

module.exports.Theatre = {
  play: function(scene) {
    return Q.when(scene).then(prepare).then(interpret);
  }
};