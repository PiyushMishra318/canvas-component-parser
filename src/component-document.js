'use strict';

const fs = require('fs');
const path = require('path');

const defaultBoilerplate = fs.readFileSync(
  path.join(__dirname, '../fixtures/boilerplate.html'),
  'utf8',
);

function addScripts(component, html) {
  const marker = html.includes('<body style="position:relative">')
    ? '<body style="position:relative">'
    : '<body>';
  const [head, tail] = html.split(marker);
  const scripts = (component.scripts || []).join('\n');
  return `${head}${marker}\n<div id="${component.elementID}">${component.html || ''}</div>\n${scripts}\n${tail}`;
}

function generateMainCSS(component) {
  let css = '';
  for (const [key, value] of Object.entries(component.style?.css || {})) {
    css += `${key}:${value};\n`;
  }
  const { x = 0, y = 0 } = component.position || {};
  return `<style>\n#${component.elementID}{\nposition:absolute;\ntop:${y}px;\nleft:${x}px;\n${css}}\n`;
}

function generatePseudoCSS(component, pseudo, selector) {
  const rules = component.style?.[pseudo] || {};
  let css = '';
  for (const [key, value] of Object.entries(rules)) {
    css += `${key}:${value};\n`;
  }
  if (!css) return '';
  return `#${component.elementID}:${selector}{\n${css}}\n`;
}

function importStyleSheets(component, html) {
  const [head, tail] = html.split('</head>');
  const styles = (component.styles || []).join('\n');
  return `${head}${styles}</head>${tail}`;
}

function addStyles(component, html) {
  const [head, tail] = html.split('</head>');
  const block =
    generateMainCSS(component) +
    generatePseudoCSS(component, 'hover', 'hover') +
    generatePseudoCSS(component, 'focus', 'focus');
  return `${head}${block}</head>${tail}`;
}

/**
 * Compose a full HTML page from canvas-style component JSON.
 *
 * Each component:
 * - elementID: unique layer id (absolute positioning target)
 * - html: inner HTML fragment
 * - styles: optional link/style tags injected in <head>
 * - scripts: optional script tags after the layer div
 * - style: { css, hover, focus } maps for generated rules
 * - position: { x, y } absolute offsets
 */
function composeDocument(components, options = {}) {
  let html = options.boilerplate || defaultBoilerplate;

  for (const component of components) {
    if (component.scripts) html = addScripts(component, html);
    if (component.styles) html = importStyleSheets(component, html);
    if (component.style) html = addStyles(component, html);
  }

  return html;
}

module.exports = composeDocument;
