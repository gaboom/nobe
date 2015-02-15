"use strict";

var Q = require('q');
var _ = require('lodash');
var glob = require('glob');

var DEFAULTS = {
  'actors': [],
  'interpreter': './interpreters/markdown',
  'observers': [],
  'scenarios': './scenarios/**/*.md'
};

module.exports = function(settings) {
  return Q.when(settings).then(function(options) {
    // Defaults are overridden with provided settings.
    var scene = _.extend({}, DEFAULTS, options);

    // Values converted to array.
    ['actors', 'observers'].forEach(function(toArray) {
      if (!Array.isArray(scene[toArray])) {
        scene[toArray] = [scene[toArray]];
      }
    });

    // Resources looked up by wildcard.
    return Q.nfcall(glob, scene.scenarios, {}).then(function(scenarios) {
      scene.scenarios = scenarios;
      return scene;
    });
  });
};