"use strict";

const {
  voidTags,
  closingTagAncestorBreakers,
  closingTags,
  childlessTags
} = require("./support-modules/tags");

const parseDefaults = {
  voidTags,
  closingTags,
  childlessTags,
  closingTagAncestorBreakers,
  includePositions: false
};

const {
  arrayIncludes,
  formatAttributes
} = require("./support-modules/react-parser-funcs");

const parser = (json, options = parseDefaults) => {
  return json
    .map(node => {
      if (node.type === "text") {
        return node.content;
      }
      if (node.type === "comment") {
        return `<!--${node.content}-->`;
      }
      const { tagName, attributes, children } = node;
      const isSelfClosing = arrayIncludes([], tagName.toLowerCase());
      return isSelfClosing
        ? `<${tagName}${formatAttributes(attributes)}>`
        : `<${tagName}${formatAttributes(attributes)}>${parser(
            children,
            options
          )}</${tagName}>`;
    })
    .join("");
};

module.exports = parser;
