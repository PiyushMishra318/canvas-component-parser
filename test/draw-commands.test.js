const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');
const coot = require('../src/index');

const template = path.join(__dirname, '../fixtures/template.html');
const sample = path.join(__dirname, '../fixtures/components.sample.json');
const canvasDemo = path.join(__dirname, '../fixtures/canvas-demo.html');

test('AST produces canvas draw commands', () => {
  const ast = coot.parseHtmlFile(canvasDemo);
  const scene = coot.astToDrawCommands(ast);
  assert.ok(scene.width > 0);
  assert.ok(scene.height > 0);
  assert.ok(scene.commands.some((c) => c.type === 'text' && /Canvas Preview Demo/.test(c.text)));
});

test('component JSON produces positioned canvas layers', () => {
  const components = JSON.parse(fs.readFileSync(sample, 'utf8'));
  const scene = coot.componentsToDrawCommands(components);
  assert.ok(scene.commands.some((c) => c.type === 'rect' && c.x === 0 && c.y === 0));
  assert.ok(scene.commands.some((c) => c.type === 'text' && /Hello from Coot/.test(c.text)));
});

test('template AST includes buttons and headings', () => {
  const ast = coot.parseHtmlFile(template);
  const scene = coot.astToDrawCommands(ast);
  const types = new Set(scene.commands.map((c) => c.type));
  assert.ok(types.has('text'));
  assert.ok(types.has('roundRect') || types.has('rect'));
});
