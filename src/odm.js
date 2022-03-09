const { log, stringToObject, isStr, isFn, isObj } = require("./utils");
const { Options } = require('./types');

/**
 * @type {Options}
 */
const options = {
  keyValues: {},
  fromObject: false,
  insertIndex: false,
  debug: false,
};

const assign = Object.assign;

/**
 * REPO:
 * - [GitHub](https://github.com/forafekt/odm/blob/main/README.md)
 *
 * DOCS:
 * - [odm](https://github.com/forafekt/odm/blob/main/README.md)
 */
function odm(row = [], opt = options) {
  let { keyValues, fromObject, debug, insertIndex } = opt;

  const results = [];

  // Main array index
  let index;

  // Changing index
  let currentIndex;

  // Array objects
  let column;

  // New value host
  let newKeyValues;

  // Mutated data
  let assignedData;
  let assignedNestedData;

  // Inital array loop
  for (index = 0; index < row.length; index++) {
    column = row[index];
    currentIndex = index;

    // First objects loop
    for (let key in keyValues) {
      if (isStr(keyValues[key])) {
        if (fromObject) {
          assignedData = assign(column, {
            [key]: stringToObject(column, keyValues[key]),
          });
        } else {
          assignedData = { [key]: keyValues[key] };
          newKeyValues = assignedData;
        }
      }
      if (isFn(keyValues[key])) {
        const func = (data) => keyValues[key](data);
        assignedData = assign(column, {
          [key]: func(column),
        });
        newKeyValues = assignedData;
      }
      if (isObj(keyValues[key])) {
        assignedData = assign(column, {
          [key]: keyValues[key],
        });
        newKeyValues = assignedData;

        // Nested objects loop
        for (let subKey in keyValues[key]) {
          if (isStr(keyValues[key][subKey])) {
            if (fromObject) {
              assignedNestedData = assign(column, {
                [key]: {
                  ...column[key],
                  [subKey]: stringToObject(column, keyValues[key][subKey]),
                },
              });
            } else {
              assignedNestedData = {
                [key]: { ...column[key], [subKey]: keyValues[key][subKey] },
              };
              newKeyValues = assignedNestedData;
            }
          }
          if (isFn(keyValues[key][subKey])) {
            const func = (data) => keyValues[key][subKey](data);
            assignedNestedData = assign(column, {
              [key]: {
                ...column[key],
                [subKey]: func(column),
              },
            });
            newKeyValues = assignedNestedData;
          }
          if (isObj(keyValues[key][subKey])) {
            assignedNestedData = assign(column, {
              [key]: {
                ...column[key],
                [subKey]: keyValues[key][subKey],
              },
            });
            newKeyValues = assignedNestedData;
          }
        }
      }
    }

    if (insertIndex) {
      results.push({
        index: currentIndex,
        ...column,
        ...newKeyValues,
      });
    } else {
      results.push({
        ...column,
        ...newKeyValues,
      });
    }
  }

  log(debug, results);
  return results;
}
module.exports = odm;
