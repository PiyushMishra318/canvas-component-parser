const childlessTags = ["style", "script", "template"];
/*
  Tags which auto-close because they cannot be nested
  For example: <p>Outer<p>Inner is <p>Outer</p><p>Inner</p>
*/
const closingTags = [
  "html",
  "head",
  "body",
  "p",
  "dt",
  "dd",
  "li",
  "option",
  "thead",
  "th",
  "tbody",
  "tr",
  "td",
  "tfoot",
  "colgroup"
];

/*
  Closing tags which have ancestor tags which
  may exist within them which prevent the
  closing tag from auto-closing.
  For example: in <li><ul><li></ul></li>,
  the top-level <li> should not auto-close.
*/
const closingTagAncestorBreakers = {
  li: ["ul", "ol", "menu"],
  dt: ["dl"],
  dd: ["dl"],
  tbody: ["table"],
  thead: ["table"],
  tfoot: ["table"],
  tr: ["table"],
  td: ["table"]
};
const voidTags = [
  "!doctype",
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];

module.exports = {
  voidTags: voidTags,
  closingTagAncestorBreakers: closingTagAncestorBreakers,
  closingTags: closingTags,
  childlessTags: childlessTags
};
