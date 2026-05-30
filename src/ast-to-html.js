'use strict';

const {
  voidTags,
  closingTagAncestorBreakers,
  closingTags,
  childlessTags,
} = require('./support/tags');
const { arrayIncludes, formatAttributes } = require('./support/html-parser-funcs');

const defaults = {
  voidTags,
  closingTags,
  childlessTags,
  closingTagAncestorBreakers,
};

function astToHtml(ast, options = defaults) {
  return ast
    .map((node) => {
      if (node.type === 'text') return node.content;
      if (node.type === 'comment') return `<!--${node.content}-->`;

      const { tagName, attributes, children } = node;
      const isSelfClosing = arrayIncludes(options.voidTags, tagName.toLowerCase());
      return isSelfClosing
        ? `<${tagName}${formatAttributes(attributes)}>`
        : `<${tagName}${formatAttributes(attributes)}>${astToHtml(children, options)}</${tagName}>`;
    })
    .join('');
}

module.exports = astToHtml;
