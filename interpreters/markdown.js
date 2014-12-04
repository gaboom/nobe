"use strict";

var Q = require('q');

var fs = require('fs');
var markdown = require('markdown').markdown;

function reduceStep(result, step) {
	result.steps.push({
		$: "STEP",
		ref: result.ref,
		match: step[1]
	});
	return result;
}

// Reduces in Θ(n)
function renderx(result, step) {
	var type = step[0];
	switch (type) {
		case 'header':
			var level = step[1].level;
			// Recursion is not on the stack, it is in the result object
			if (!result.parent || level > result.parent.level) {
				return {
					$: 'SCENARIO',
					ref: result.ref,
					id: step.pop(),
					level: result.level + 1,
					steps: [],
					parent: result
				};
			}
			result.parent.steps.push(result);
			result = result.parent;
			delete result.parent;
			break;
		case 'numberlist':
		case 'bulletlist':
			step.shift();
			step.reduce(reduceStep, result);
			break;
		case "para":
			reduceStep(result, step);
			break;
		default:
			throw Error("Unexpected Markdown " + type);
	}
	return result;
}

// Θ(n) recursion
function render(markdown, meta) {
	var result = {
		$: 'SCENARIO',
		ref: meta.ref,
		id: meta.ref,
		level: 0,
		steps: []
	};
	if (Array.isArray(markdown)) {
		var type = markdown.shift();
		switch (type) {
			case 'markdown':
				result.steps = markdown.map(render, meta);
				break;
			case 'bulletlist':
			case 'numberlist':

				break;
			default:
				console.log(markdown);
				throw new Error("Unsupported Markdown " + type);
		}
	}
	return result;
}

module.exports = function interpret(resource) {
	return Q.when(resource).then(function () {
		// Read resource
		return Q.nfcall(fs.readFile, resource);
	}).then(function (buffer) {
		// Parse markdown
		return markdown.parse(buffer.toString());
	}).then(function (markdown) {
		// Render from Markdown JsonML flat list to scenario hierarchy
		return render(markdown, {
			ref: resource
		});
	});
};