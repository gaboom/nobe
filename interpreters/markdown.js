"use strict";

var Q = require('q');
var _ = require('lodash');

var fs = require('fs');
var markdown = require('markdown').markdown;

module.exports = function interpret(resource) {
	return Q.when(resource).then(function () {
		// Read resource
		return Q.nfcall(fs.readFile, resource);
	}).then(function (buffer) {
		// Parse markdown
		return markdown.parse(buffer.toString());
	}).then(function (markdown) {
		// Render markdown as scenario
		markdown.shift();
		var stack = [];
		markdown.reduce(function(values, value){

		}, []);
		return markdown;
	});
};