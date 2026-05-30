const startsWith = (str, searchString, position) => {
  return str.substr(position || 0, searchString.length) === searchString;
};

const endsWith = (str, searchString, position) => {
  const index = (position || str.length) - searchString.length;
  const lastIndex = str.lastIndexOf(searchString, index);
  return lastIndex !== -1 && lastIndex === index;
};

const stringIncludes = (str, searchString, position) => {
  return str.indexOf(searchString, position || 0) !== -1;
};

const isRealNaN = x => {
  return typeof x === "number" && isNaN(x);
};

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const convertToCamelCase = keys => {
  var split_keys = keys.split("-");
  return `${split_keys[0]}${capitalize(split_keys[1])}`;
};

const react_events = require("./react-events");

const jsxifyStyle = value => {
  //remove whitespaces from the style string
  value = value.replace(/ /g, "");
  var styles = value.split(";");
  var filtered_styles = styles.filter(style => style !== "");
  var jsxStyle = "";
  // convesion
  filtered_styles.forEach(style => {
    var split_style = style.split(":");
    if (split_style[0].includes("-")) {
      jsxStyle += `${convertToCamelCase(split_style[0])}:"${split_style[1]}",`;
    } else {
      jsxStyle += `${split_style[0]}:"${split_style[1]}",`;
    }
  });
  jsxStyle = jsxStyle.substring(0, jsxStyle.length - 1);
  return `{{${jsxStyle}}}`;
};

const arrayIncludes = (array, searchElement, position) => {
  const len = array.length;
  if (len === 0) return false;

  const lookupIndex = position | 0;
  const isNaNElement = isRealNaN(searchElement);
  let searchIndex = lookupIndex >= 0 ? lookupIndex : len + lookupIndex;
  while (searchIndex < len) {
    const element = array[searchIndex++];
    if (element === searchElement) return true;
    if (isNaNElement && isRealNaN(element)) return true;
  }
  return false;
};

const formatAttributes = attributes => {
  return attributes.reduce((attrs, attribute) => {
    var { key, value } = attribute;
    if (value === null) {
      return `${attrs} ${key}`;
    }
    if (key === "class") {
      key = "className";
    }

    if (key.includes("-")) {
      key = convertToCamelCase(key);
    }
    if (key === "dataComponent") {
      return `${attrs}`;
    }
    const quoteEscape = value.indexOf("'") !== -1;
    const quote = quoteEscape ? '"' : "'";
    if (react_events[key]) {
      key = react_events[key];
      value = value.substring(0, value.length - 2);
      value = `{${value}}`;
      return `${attrs} ${key}=${value}`;
    } else if (key === "style") {
      value = jsxifyStyle(value);
      return `${attrs} ${key}=${value}`;
    } else {
      return `${attrs} ${key}=${quote}${value}${quote}`;
    }
  }, "");
};

module.exports = {
  formatAttributes: formatAttributes,
  arrayIncludes: arrayIncludes
};
