'use strict';

var Q = require('q');
var minimist = require('minimist');

var director = require('./director');

var DEFAULTS = {
	EXIT_CODE_FAIL: -1
};

// If run from the command line director is invoked with command line arguments.
if (require.main === module) {
	var args = process.argv.slice(2);
	var settings = minimist(args);

	// If not disabled explicitly turn on Q's long stack support
	if (typeof settings !== 'object' || settings.longStackSupport === undefined || !!settings.longStackSupport) {
		Q.longStackSupport = true;
	}

	Q.try(director, settings)
		.catch(function (error) {
			console.log(error && error.stack ? error.stack : error);
			process.exit(DEFAULTS.EXIT_CODE_FAIL);
		}).done();
}