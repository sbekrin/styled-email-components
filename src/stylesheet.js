let lastId = 0;
const registry = {};

const guid = () => lastId++;

const registerStyle = style => {
  const id = guid();
  registry[id] = style;
  return id;
};

const resolveStyle = id => registry[id];

const create = styles => {
  const result = {};
  Object.keys(styles).forEach(key => {
    result[key] = registerStyle(styles[key]);
  });
  return result;
};

const merge = (left = {}, right = {}) => ({ ...left, ...right });

const flatten = input => {
  if (Array.isArray(input)) {
    return input.reduce((acc, val) => merge(acc, flatten(val)), {});
  } else if (typeof input === 'number') {
    return resolveStyle(input);
  } else if (!input) {
    return undefined;
  }
  return input;
};

const resolve = style => flatten(style);

const StyleSheet = {
  hairlineWidth: 1,
  absoluteFill: registerStyle({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }),
  create,
  flatten,
  resolve,
};

export default StyleSheet;
