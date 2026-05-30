# canvas-component-parser

> npm package: `canvas-component-parser` (repo folder: `coot-parser--experimental`)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen?logo=node.js&logoColor=white)](package.json)

Experimental parser for a **Canva-style design editor** custom component structure. It turns exported HTML and canvas JSON into:

- **Himalaya AST** (HTML as JSON)
- **React-friendly markup** (`class` → `className`, inline `style` → JSX objects, DOM events → React props)
- **Composed HTML pages** from positioned component documents
- **Split component files** via `data-component="ComponentName"` layer markers

Built while exploring design-to-code for a Canva competitor workflow.

## Component document format

Each canvas layer is a JSON object:

```json
{
  "elementID": "hero-block",
  "html": "<h1>Title</h1>",
  "styles": ["<link rel=\"stylesheet\" href=\"...\" />"],
  "scripts": ["<script>...</script>"],
  "style": {
    "css": { "width": "100%" },
    "hover": {},
    "focus": {}
  },
  "position": { "x": 0, "y": 0 }
}
```

The composer injects absolute positioning, pseudo-state CSS, scripts, and fragments into a boilerplate HTML shell.

## HTML → React conversion

Markup exported from the editor can include `data-component` attributes to identify logical React components. The parser:

1. Parses HTML with [Himalaya](https://github.com/andrejewski/himalaya)
2. Walks the AST and converts attributes/styles/events for JSX
3. Optionally splits layers marked with `data-component`

## Install

```bash
git clone git@github.com:PiyushMishra318/coot-parser--experimental.git
cd coot-parser--experimental
npm install
```

## CLI

```bash
# AST JSON
node bin/coot-parser.js ast fixtures/template.html --out ast.json

# React-friendly markup
node bin/coot-parser.js react fixtures/template.html --out out.jsx.html

# Compose canvas JSON → full page
node bin/coot-parser.js compose fixtures/components.sample.json --out page.html

# Split data-component layers
node bin/coot-parser.js split fixtures/template.html --out-dir dist/components
```

## Demo server

```bash
npm start
# GET http://127.0.0.1:3000/parse/react?file=fixtures/template.html
# POST http://127.0.0.1:3000/compose  (JSON component array body)
```

Open `/` for the upload/paste UI. Deploy on Vercel:

```bash
npx vercel --prod
```

## Project layout

```text
src/
├── ast-to-html.js          # AST → HTML
├── ast-to-react.js         # AST → React markup
├── component-document.js   # Canvas JSON → composed page
├── split-components.js     # data-component layer extraction
└── support/                # Tags, JSX attribute helpers
fixtures/                   # Sample HTML + component JSON
bin/coot-parser.js          # CLI
```

## Tests

```bash
npm test
```

## Status

Experimental — API and output formats may change. Intended as a reference for custom component parsing, not production design tooling.

## License

MIT © 2026 [Piyush Mishra](https://github.com/PiyushMishra318)
