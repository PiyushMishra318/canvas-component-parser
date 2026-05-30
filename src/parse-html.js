'use strict';

const { parse } = require('himalaya');

function parseHtmlFile(inputPath) {
  const fs = require('fs');
  const html = fs.readFileSync(inputPath, 'utf8');
  return parse(html);
}

module.exports = { parseHtmlFile };
