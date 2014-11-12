"use strict";

var Q = require('q');
var extend = require('extend');

var fs = require('fs');
var marked = require('marked');

// https://github.com/chjj/marked
var DEFAULTS = {
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
};

module.exports = function interpret(resource) {
  return Q.when(resource).then(function() {
    // Read resource
    return Q.nfcall(fs.readFile, resource);
  }).then(function(buffer) {
    // Parse story
    var story = {};

    var parser = extend({}, DEFAULTS, {
      renderer: {
        code: function(code, language) {
          //throw "UNSUPPORTED";
        },
        blockquote: function(quote) {
          //throw "UNSUPPORTED";
        },
        html: function(html) {
          //throw "UNSUPPORTED";
        },
        heading: function(text, level) {
          //throw "UNSUPPORTED";
        },
        hr: function() {
          //throw "UNSUPPORTED";
        },
        list: function(body, ordered) {
          //throw "UNSUPPORTED";
        },
        listitem: function(text) {
          //throw "UNSUPPORTED";
        },
        paragraph: function(text) {
          //throw "UNSUPPORTED";
        },
        table: function(header, body) {
          //throw "UNSUPPORTED";
        },
        tablerow: function(content) {
          //throw "UNSUPPORTED";
        },
        tablecell: function(content, flags) {
          //throw "UNSUPPORTED";
        },
        strong: function(text) {
          //throw "UNSUPPORTED";
        },
        em: function(text) {
          //throw "UNSUPPORTED";
        },
        codespan: function(code) {
          //throw "UNSUPPORTED";
        },
        br: function() {
          //throw "UNSUPPORTED";
        },
        del: function(text) {
          //throw "UNSUPPORTED";
        },
        link: function(href, title, text) {
          //throw "UNSUPPORTED";
        },
        image: function(href, title, text) {
          //throw "UNSUPPORTED";
        }
      }
    });

    return Q.nfcall(marked, buffer.toString(), parser);
  }).then(function(story) {
  });
};