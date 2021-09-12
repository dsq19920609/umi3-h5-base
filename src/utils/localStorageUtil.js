import * as defaultSettings  from '../defaultSettings';

const { basePath, appName} = defaultSettings;
const basePrefix = `${basePath}/${appName}/`;

function getItem(key) {
  key = basePrefix + key;
  let data = localStorage.getItem(key);
  if (data == 'undefined') {
    data = '{}';
  }
  return JSON.parse(data);
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

function setItem(key, value) {
  key = basePrefix + key;
  localStorage.setItem(key, JSON.stringify(value));
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

function removeItem(key) {
  key = basePrefix + key;
  localStorage.removeItem(key);
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
  localStorage.clear();
}

export {
  getItem as localGetItem,
  getItems as localGetItems,
  setItem as localSetItem,
  setItems as localSetItems,
  removeItem as localRemoveItem,
  removeItems as localRemoveItems,
  clear as localClear
};