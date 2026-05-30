'use strict';

const fs = require('fs');
const path = require('path');
const { parse } = require('himalaya');
const astToHtml = require('./ast-to-html');
const astToReact = require('./ast-to-react');
const composeDocument = require('./component-document');
const splitComponents = require('./split-components');
const astToDrawCommands = require('./ast-to-draw-commands');
const componentsToDrawCommands = require('./components-to-draw-commands');

function readInput(inputPath) {
  if (!inputPath) {
    throw new Error('Input path is required');
  }
  const resolved = path.resolve(inputPath);
  return fs.readFileSync(resolved, 'utf8');
}

function parseHtmlFile(inputPath) {
  const html = readInput(inputPath);
  return parse(html);
}

function parseHtmlString(html) {
  return parse(html);
}

function htmlFileToHtml(inputPath) {
  const ast = parseHtmlFile(inputPath);
  return astToHtml(ast);
}

function htmlFileToReact(inputPath) {
  const ast = parseHtmlFile(inputPath);
  return astToReact(ast);
}

function composeFromFile(jsonPath, options = {}) {
  const raw = readInput(jsonPath);
  const document = JSON.parse(raw);
  const components = Array.isArray(document) ? document : document.components;
  return composeDocument(components, options);
}

function splitFromFile(inputPath) {
  const ast = parseHtmlFile(inputPath);
  return splitComponents(ast);
}

module.exports = {
  parseHtmlFile,
  parseHtmlString,
  htmlFileToHtml,
  htmlFileToReact,
  composeFromFile,
  composeDocument,
  splitFromFile,
  splitComponents,
  astToHtml,
  astToReact,
  astToDrawCommands,
  componentsToDrawCommands,
};
