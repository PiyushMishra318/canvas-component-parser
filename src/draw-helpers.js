'use strict';

function getAttr(node, name) {
  if (!node?.attributes) return null;
  const attr = node.attributes.find(
    (a) => a.key === name || a.key === name.replace(/-/g, ''),
  );
  return attr?.value ?? null;
}

function parseInlineStyle(styleStr) {
  const out = {};
  if (!styleStr || typeof styleStr !== 'string') return out;
  for (const part of styleStr.split(';')) {
    const idx = part.indexOf(':');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = value;
  }
  return out;
}

function collectText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.content || '';
  return (node.children || []).map(collectText).join('').trim();
}

function parseSize(value, fallback) {
  if (value == null || value === '') return fallback;
  if (typeof value === 'number') return value;
  const s = String(value).trim();
  if (s.endsWith('%')) return fallback;
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : fallback;
}

function stripHtmlText(html) {
  if (!html) return [];
  const lines = [];
  const re = /<(h1|h2|h3|p|button|span)[^>]*>([^<]*)<\//gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    lines.push({ tag: m[1].toLowerCase(), text: m[2].trim() });
  }
  if (!lines.length && html) {
    const plain = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (plain) lines.push({ tag: 'p', text: plain });
  }
  return lines;
}

module.exports = {
  getAttr,
  parseInlineStyle,
  collectText,
  parseSize,
  stripHtmlText,
};
