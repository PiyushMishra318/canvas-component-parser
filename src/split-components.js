'use strict';

const fs = require('fs');
const path = require('path');
const astToReact = require('./ast-to-react');

function getAttr(node, name) {
  if (!node.attributes) return null;
  const attr = node.attributes.find(
    (a) => a.key === name || a.key === name.replace(/-/g, ''),
  );
  return attr?.value ?? null;
}

function serializeNode(node) {
  return astToReact([node]);
}

function walk(nodes, results) {
  for (const node of nodes) {
    const componentName =
      getAttr(node, 'data-component') || getAttr(node, 'dataComponent');
    if (componentName && node.type === 'element') {
      results.push({
        name: componentName,
        html: serializeNode(node),
        ast: node,
      });
    }
    if (node.children?.length) walk(node.children, results);
  }
}

function splitComponents(ast) {
  const results = [];
  walk(ast, results);
  return results;
}

function writeComponentFiles(components, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const written = [];
  for (const { name, html } of components) {
    const filePath = path.join(outDir, `${name}.jsx.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    written.push(filePath);
  }
  return written;
}

module.exports = splitComponents;
module.exports.writeComponentFiles = writeComponentFiles;
