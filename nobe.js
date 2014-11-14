"use strict";

var Q = require('q');
var minimist = require('minimist');

var scene = require("./scene").Scene;
var theatre = require('./theatre').Theatre;

var DEFAULTS = {
	EXIT_CODE_FAIL: -1
};

module.exports.Director = {
	execute: function (settings) {
		return Q.when(settings)
			.then(scene.setUp)
			.then(theatre.play);
	}
};

// If run from the command line Director is executed with command line arguments.
if (require.main === module) {
	var args = process.argv.slice(2);
	var settings = minimist(args);

	if (typeof settings !== 'object' || settings.longStackSupport === undefined || !!settings.longStackSupport) {
		Q.longStackSupport = true;
	}

	Q.try(module.exports.Director.execute, settings)
		.catch(function (error) {
			console.log(error && error.stack ? error.stack : error);
			process.exit(DEFAULTS.EXIT_CODE_FAIL);
		}).done();
}