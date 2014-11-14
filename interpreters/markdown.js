"use strict";

var Q = require('q');
var _ = require('lodash');

var fs = require('fs');
var marked = require('marked');

// https://github.com/chjj/marked
var DEFAULTS = {
	highlight: null,
	gfm: true,
	tables: true,
	breaks: true,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
};

function parserStateMachine(options, story) {
	return _.extend({}, options, {
		renderer: {
			code: function (code, language) {
				throw new Error("Markdown code unsupported yet.");
			},
			blockquote: function (quote) {
				throw new Error("Markdown blockquote unsupported yet.");
			},
			html: function (html) {
				throw new Error("Markdown html unsupported yet.");
			},
			heading: function (text, level) {
				story.scenarios.push(text);
			},
			hr: function () {
				throw new Error("Markdown hr unsupported yet.");
			},
			list: function (body, ordered) {
				console.log("L: " + body);
			},
			listitem: function (text) {
				story.steps.push(text);
			},
			paragraph: function (text) {
				console.log("P: " + text);
			},
			table: function (header, body) {
				throw new Error("Markdown table unsupported yet.");
			},
			tablerow: function (content) {
				throw new Error("Markdown tablerow unsupported yet.");
			},
			tablecell: function (content, flags) {
				throw new Error("Markdown tablecell unsupported yet.");
			},
			strong: function (text) {
				throw new Error("Markdown strong unsupported yet.");
			},
			em: function (text) {
				throw new Error("Markdown em unsupported yet.");
			},
			codespan: function (code) {
				throw new Error("Markdown codespan unsupported yet.");
			},
			br: function () {
				throw new Error("Markdown br unsupported yet.");
			},
			del: function (text) {
				throw new Error("Markdown del unsupported yet.");
			},
			link: function (href, title, text) {
				throw new Error("Markdown link unsupported yet.");
			},
			image: function (href, title, text) {
				throw new Error("Markdown image unsupported yet.");
			}
		}
	});
}

module.exports = function interpret(resource) {
	return Q.when(resource).then(function () {
		// Read resource
		return Q.nfcall(fs.readFile, resource);
	}).then(function (buffer) {
		// Parse into
		var story = {
			scenarios: [],
			steps: []
		}
		return Q.nfcall(marked, buffer.toString(), parserStateMachine(DEFAULTS, story));
	}).then(function (story) {
		console.log(story);
	});
};