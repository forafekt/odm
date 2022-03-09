function log(_debug, ...data) {
  if (_debug) {
    console.log(...data);
  }
}

function stringToObject(obj, str) {
  str = str.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  str = str.replace(/^\./, ""); // strip a leading dot
  var array = str.split(".");
  for (var i = 0, n = array.length; i < n; ++i) {
    var k = array[i];
    if (k in obj) {
      obj = obj[k];
    } else {
      return;
    }
  }
  return obj;
}

function isNum(v) {
  return typeof v === "number" && !isNaN(v);
}

function isBool(v) {
  return typeof v === "boolean";
}

function isStr(v) {
  return typeof v === "string";
}

function isFn(v) {
  return typeof v === "function";
}

function isObj(v) {
  return typeof v === "object";
}

function isUndefined(v) {
  return typeof v === "undefined";
}

module.exports = {
  log,
  stringToObject,
  isBool,
  isFn,
  isNum,
  isStr,
  isObj,
  isUndefined,
};
