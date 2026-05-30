#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const coot = require('../src/index');
const { writeComponentFiles } = require('../src/split-components');

function usage() {
  console.log(`Usage:
  coot-parser ast <input.html> [--out file.json]
  coot-parser html <input.html> [--out file.html]
  coot-parser react <input.html> [--out file.html]
  coot-parser compose <components.json> [--out file.html]
  coot-parser split <input.html> [--out-dir dir]

Commands:
  ast      Parse HTML to Himalaya JSON AST
  html     Regenerate HTML from AST
  react    Convert HTML AST to React-friendly markup
  compose  Build a page from canvas-style component JSON
  split    Extract data-component layers to separate files
`);
}

function readFlag(args, flag, fallback = null) {
  const index = args.indexOf(flag);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function main() {
  const [, , command, input, ...rest] = process.argv;
  if (!command || command === '--help' || command === '-h') {
    usage();
    process.exit(command ? 0 : 1);
  }

  const out = readFlag(rest, '--out');
  const outDir = readFlag(rest, '--out-dir', 'dist/components');

  switch (command) {
    case 'ast': {
      const ast = coot.parseHtmlFile(input);
      const payload = JSON.stringify(ast, null, 2);
      if (out) fs.writeFileSync(out, payload);
      else console.log(payload);
      break;
    }
    case 'html': {
      const html = coot.htmlFileToHtml(input);
      if (out) fs.writeFileSync(out, html);
      else console.log(html);
      break;
    }
    case 'react': {
      const jsx = coot.htmlFileToReact(input);
      if (out) fs.writeFileSync(out, jsx);
      else console.log(jsx);
      break;
    }
    case 'compose': {
      const page = coot.composeFromFile(input);
      if (out) fs.writeFileSync(out, page);
      else console.log(page);
      break;
    }
    case 'split': {
      const components = coot.splitFromFile(input);
      const written = writeComponentFiles(components, outDir);
      console.log(`Wrote ${written.length} component file(s) to ${outDir}`);
      break;
    }
    default:
      usage();
      process.exit(1);
  }
}

main();
