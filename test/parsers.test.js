const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const coot = require('../src/index');

const template = path.join(__dirname, '../fixtures/template.html');
const sample = path.join(__dirname, '../fixtures/components.sample.json');

test('parses HTML to AST', () => {
  const ast = coot.parseHtmlFile(template);
  assert.ok(Array.isArray(ast));
  assert.ok(ast.length > 0);
});

test('converts AST to React markup with className', () => {
  const react = coot.htmlFileToReact(template);
  assert.match(react, /className=/);
});

test('splits data-component layers', () => {
  const components = coot.splitFromFile(template);
  assert.ok(components.some((c) => c.name === 'App'));
});

test('composes canvas component JSON into HTML', () => {
  const html = coot.composeFromFile(sample);
  assert.match(html, /hero-block/);
  assert.match(html, /Hello from Coot/);
});
