"use strict";

var Q = require('q');
var extend = require('extend');
var glob = require('glob');

var DEFAULTS = {
  'actors': [],
  'interpreter': './interpreters/markdown',
  'stacktrace': true,
  'stories': './stories/**/*.md'
};

module.exports.Scene = {
  setUp: function(settings) {
    // Defaults are overridden with provided settings.
    var scene = extend(
      {},
      DEFAULTS,
      settings
      );

    // Values converted to array.
    ['steps'].forEach(function(toArray) {
      if (!Array.isArray(scene[toArray])) {
        scene[toArray] = [scene[toArray]];
      }
    });
    
    Q.longStackSupport = !!scene.stacktrace;

    // Reources looked up by wildcard.
    return Q.nfcall(glob, scene.stories, {}).then(function(stories) {
      scene.stories = stories;
      return scene;
    });
  }
};