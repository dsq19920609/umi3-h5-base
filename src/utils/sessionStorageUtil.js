import * as defaultSettings  from '../defaultSettings';

const { basePath, appName} = defaultSettings;
const basePrefix = `${basePath}/${appName}/`;

function getItem(key) {
  key = basePrefix + key;
  let data = sessionStorage.getItem(key);
  if (data == 'undefined') {
    data = '{}';
  }
  return JSON.parse(data);
}

function setItem(key, value) {
  key = basePrefix + key;
  sessionStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
  key = basePrefix + key;
  sessionStorage.removeItem(key);
}

function getItems(keys) {
  const items = {};
  if(!Array.isArray(keys) || keys.length === 0) {
    throw new TypeError('keys must be an array');
  }
  keys.forEach(key => {
    items[key]= getItem(key)
  });
  return items;
}

/**
 * 
 * @param {Object} obj 
 * {key1: value1, key2: value2 ...}
 */
function setItems(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    throw new TypeError('obj must be an object');
  }
  const keys = Object.keys(obj);
  keys.forEach(key => {
    setItem(key, obj[key]);
  });
}

function removeItems(keys) {
  if(!Array.isArray(keys) || keys.length === 0) {
    throw new TypeError('keys must be an array');
  }
  keys.forEach(key => {
    removeItem(key);
  });
}

function clear() {
  sessionStorage.clear();
}

export {
  getItem as sessionGetItem,
  getItems as sessionGetItems,
  setItem as sessionSetItem,
  setItems as sessionSetItems,
  removeItem as sessionRemoveItem,
  removeItems as sessionRemoveItems,
  clear as sessionClear
};