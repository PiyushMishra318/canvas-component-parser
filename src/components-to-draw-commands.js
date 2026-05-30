'use strict';

const { parseSize, stripHtmlText } = require('./draw-helpers');

function componentsToDrawCommands(components, options = {}) {
  const width = options.width || 640;
  const commands = [];
  let maxBottom = 120;

  for (const component of components) {
    const id = component.elementID || component.name || 'layer';
    const { x = 0, y = 0 } = component.position || {};
    const css = component.style?.css || {};
    const w = parseSize(css.width, 300);
    const pad = parseSize(css.padding, 16);
    const lines = stripHtmlText(component.html || '');
    const textH = lines.reduce((sum, line) => sum + (line.tag === 'h1' ? 36 : 24), 0);
    const h = Math.max(parseSize(css.height, 0), pad * 2 + textH + 8, 80);
    const fill = css.background || css.backgroundColor || '#1e293b';
    const color = css.color || '#f8fafc';

    commands.push({ type: 'rect', x, y, w, h, fill, stroke: '#64748b', radius: 6 });
    commands.push({
      type: 'text', x: x + 8, y: y + 14, text: `#${id}`,
      fill: '#94a3b8', font: '10px ui-monospace,monospace',
    });

    let ty = y + pad + 20;
    for (const line of lines) {
      const isHeading = line.tag.startsWith('h');
      commands.push({
        type: 'text', x: x + pad, y: ty, text: line.text, fill: color,
        font: isHeading ? 'bold 20px system-ui,sans-serif' : '14px system-ui,sans-serif',
      });
      ty += isHeading ? 34 : 22;
    }
    maxBottom = Math.max(maxBottom, y + h + 24);
  }

  return { width, height: Math.max(options.height || 360, maxBottom), commands };
}

module.exports = componentsToDrawCommands;
