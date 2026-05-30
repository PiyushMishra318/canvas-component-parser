'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const parser = require('./index');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '2mb' }));
app.use('/fixtures', express.static(path.join(__dirname, '../fixtures')));

app.get('/api', (_req, res) => {
  res.json({
    name: 'canvas-component-parser',
    description: 'Canvas-style component document parser',
    endpoints: {
      'GET /health': 'Health check',
      'POST /parse/ast': 'Himalaya AST from HTML body',
      'POST /parse/react': 'React markup from HTML body',
      'POST /compose': 'Compose HTML from component JSON array body',
      'GET /split?file=fixtures/template.html': 'List data-component layers',
      'POST /parse/canvas': 'Canvas draw commands from HTML or component JSON',
    },
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

function resolveFixture(filePath) {
  return path.resolve(process.cwd(), filePath);
}

app.get('/parse/ast', (req, res) => {
  const file = req.query.file || 'fixtures/template.html';
  res.json(parser.parseHtmlFile(resolveFixture(file)));
});

app.post('/parse/ast', (req, res) => {
  try {
    res.json(parser.parseHtmlString(req.body.html));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/parse/react', (req, res) => {
  const file = req.query.file || 'fixtures/template.html';
  res.type('text/plain').send(parser.htmlFileToReact(resolveFixture(file)));
});

app.post('/parse/react', (req, res) => {
  try {
    const ast = parser.parseHtmlString(req.body.html);
    res.type('text/plain').send(parser.astToReact(ast));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/compose', (req, res) => {
  const components = Array.isArray(req.body) ? req.body : req.body.components;
  if (!components) {
    res.status(400).json({ error: 'Expected JSON array or { components: [] }' });
    return;
  }
  res.type('text/html').send(parser.composeDocument(components));
});

app.get('/split', (req, res) => {
  const file = req.query.file || 'fixtures/template.html';
  res.json(parser.splitFromFile(resolveFixture(file)));
});

app.post('/parse/canvas', (req, res) => {
  try {
    const components = Array.isArray(req.body)
      ? req.body
      : req.body.components;
    if (components) {
      res.json(parser.componentsToDrawCommands(components));
      return;
    }
    if (!req.body.html) {
      res.status(400).json({ error: 'Expected { html } or { components: [] }' });
      return;
    }
    const ast = parser.parseHtmlString(req.body.html);
    res.json(parser.astToDrawCommands(ast));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`canvas-component-parser demo on http://127.0.0.1:${port}`);
  });
}

module.exports = app;
