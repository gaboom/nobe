"use strict";

var Q = require('q');
var _ = require('lodash');
var glob = require('glob');

var DEFAULTS = {
	'actors': [],
	'interpreter': './interpreters/markdown',
	'stacktrace': true,
	'stories': './stories/**/*.md'
};

module.exports.Scene = {
	setUp: function (settings) {
		return Q.when(settings).then(function (scene) {
			// Defaults are overridden with provided settings.
			return _.extend({}, DEFAULTS, scene);
		}).then(function (scene) {
			// Values converted to array.
			['steps'].forEach(function (toArray) {
				if (!Array.isArray(scene[toArray])) {
					scene[toArray] = [scene[toArray]];
				}
			});
			return scene;
		}).then(function (scene) {
			// Resources looked up by wildcard.
			return Q.nfcall(glob, scene.stories, {}).then(function (stories) {
				scene.stories = stories;
				return scene;
			});
		});
	}
};