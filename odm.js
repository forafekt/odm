const { log, stringToObject } = require("./utils");

let string = new String();
let any;

let options = {
  keyValues: { [string]: any },
  fromObject: false,
  insertIndex: false,
  debug: false,
};

/**
 *
 * @name odm (Object Data Mutate)
 * @param {*} row
 * @param {*} opt
 * @typedef {*} options
 * @returns Mutated array
 * @example 
 * odm(users.rows, {
        debug: true, // log
        fromObject: true, // takes value from initial field in users.rows
        keyValues: {
          id: 'user_id', // 123
          stuff: {
            1: data => data.wallet_address, // 0x000...
            2: 'user_type', // 'somestring'
            3: 'first_name', // jonny
          },
          z: data => data.nationality, // irish // uses data from users.rows
          y: data => data.stuff, // use data from above objects
            // {
                // 1: data => data.wallet_address, // 0x000...
                // 2: 'user_type', // 'somestring'
                // 3: 'first_name', // jonny
            // } 
        },
      });
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

    // Fist objects loop
    for (let key in keyValues) {
      if (typeof keyValues[key] === "string") {
        if (fromObject) {
          assignedData = Object.assign(column, {
            [key]: stringToObject(column, keyValues[key]),
          });
        } else {
          assignedData = keyValues[key];
          newKeyValues = assignedData;
        }
      }
      if (typeof keyValues[key] === "function") {
        const func = (data) => keyValues[key](data);
        assignedData = Object.assign(column, {
          [key]: func(column),
        });
        newKeyValues = assignedData;
      }
      if (typeof keyValues[key] === "object") {
        assignedData = Object.assign(column, {
          [key]: keyValues[key],
        });
        newKeyValues = assignedData;

        // Nested objects loop
        for (let subKey in keyValues[key]) {
          if (typeof keyValues[key][subKey] === "string") {
            if (fromObject) {
              assignedNestedData = Object.assign(column, {
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
          if (typeof keyValues[key][subKey] === "function") {
            const func = (data) => keyValues[key][subKey](data);
            assignedNestedData = Object.assign(column, {
              [key]: {
                ...column[key],
                [subKey]: func(column),
              },
            });
            newKeyValues = assignedNestedData;
          }
          if (typeof keyValues[key][subKey] === "object") {
            assignedNestedData = Object.assign(column, {
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
