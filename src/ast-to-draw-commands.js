'use strict';

const { getAttr, parseInlineStyle, collectText } = require('./draw-helpers');

const PADDING = 16;
const BLOCK_TAGS = new Set([
  'div', 'section', 'header', 'article', 'nav', 'main', 'footer', 'aside',
]);
const TEXT_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'label', 'a']);
const SKIP_TAGS = new Set(['html', 'head', 'script', 'style', 'meta', 'link', 'title']);

const FONT_BY_TAG = {
  h1: 'bold 22px system-ui,sans-serif',
  h2: 'bold 18px system-ui,sans-serif',
  h3: 'bold 16px system-ui,sans-serif',
  h4: 'bold 14px system-ui,sans-serif',
  p: '14px system-ui,sans-serif',
  span: '13px system-ui,sans-serif',
  label: '12px system-ui,sans-serif',
  a: '13px system-ui,sans-serif',
};

const LINE_BY_TAG = {
  h1: 36, h2: 30, h3: 26, h4: 22, p: 22, span: 20, label: 18, button: 44,
};

function estimateBlockHeight(node) {
  let h = PADDING * 2;
  for (const child of node.children || []) {
    if (child.type === 'text') { h += 18; continue; }
    if (child.type !== 'element') continue;
    const tag = child.tagName.toLowerCase();
    if (tag === 'button') h += LINE_BY_TAG.button;
    else if (TEXT_TAGS.has(tag)) h += LINE_BY_TAG[tag] || 20;
    else if (BLOCK_TAGS.has(tag)) h += estimateBlockHeight(child);
    else h += 20;
  }
  return Math.max(48, h);
}

function astToDrawCommands(ast, options = {}) {
  const width = options.width || 640;
  const commands = [];
  let y = PADDING;
  const margin = PADDING;

  function pushLabel(text, x, color = '#6366f1') {
    commands.push({
      type: 'text', x, y: Math.max(PADDING, y), text, fill: color,
      font: '600 11px system-ui,sans-serif',
    });
    y += 14;
  }

  function walk(nodes, depth = 0) {
    for (const node of nodes) {
      if (node.type !== 'element') continue;
      const tag = node.tagName.toLowerCase();
      if (tag.startsWith('!') || SKIP_TAGS.has(tag)) {
        if (node.children?.length) walk(node.children, depth);
        continue;
      }
      const style = parseInlineStyle(getAttr(node, 'style'));
      const comp = getAttr(node, 'data-component');
      const x = margin + depth * 14;
      if (comp) pushLabel(`layer ${comp}`, x);
      if (BLOCK_TAGS.has(tag)) {
        const blockH = estimateBlockHeight(node);
        const blockW = width - x - margin;
        const fill = style.background || style.backgroundColor || (depth === 0 ? '#f8fafc' : '#f1f5f9');
        commands.push({ type: 'rect', x, y, w: blockW, h: blockH, fill, stroke: '#cbd5e1', radius: 8 });
        y += PADDING;
        walk(node.children || [], depth + 1);
        y += PADDING;
        continue;
      }
      if (tag === 'button') {
        const text = collectText(node);
        const btnW = Math.min(200, Math.max(72, text.length * 9 + 36));
        const btnClass = getAttr(node, 'class') || '';
        const fill = btnClass.includes('btn') ? '#86efac' : '#93c5fd';
        commands.push({ type: 'roundRect', x, y, w: btnW, h: 32, fill, stroke: '#166534', radius: 10 });
        commands.push({
          type: 'text', x: x + 14, y: y + 21, text: text || 'Button',
          fill: '#14532d', font: 'bold 13px system-ui,sans-serif',
        });
        y += LINE_BY_TAG.button;
        continue;
      }
      if (TEXT_TAGS.has(tag)) {
        const text = collectText(node);
        if (!text) continue;
        const lineH = LINE_BY_TAG[tag] || 20;
        commands.push({
          type: 'text', x: x + (tag === 'p' ? 4 : 0), y: y + lineH - 6, text,
          fill: style.color || '#0f172a', font: FONT_BY_TAG[tag] || '14px system-ui,sans-serif',
        });
        y += lineH;
        continue;
      }
      if (node.children?.length) walk(node.children, depth);
    }
  }

  walk(Array.isArray(ast) ? ast : [ast], 0);
  return { width, height: Math.max(options.height || 360, y + PADDING), commands };
}

module.exports = astToDrawCommands;
