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
    const { key, value } = attribute;
    if (value === null) {
      return `${attrs} ${key}`;
    }
    const quoteEscape = value.indexOf("'") !== -1;
    const quote = quoteEscape ? '"' : "'";
    return `${attrs} ${key}=${quote}${value}${quote}`;
  }, "");
};

module.exports = {
  formatAttributes: formatAttributes,
  arrayIncludes: arrayIncludes
};
