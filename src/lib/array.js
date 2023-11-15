/**
 * Sort array of objects by object property.
 * Example: Sort list of users by their first name.
 * @param {Object} items Array of objects.
 * @param {string} col Property to sort by.
 * @returns sorted items.
 */
export const sortBy = (items, col) => {
  return items.sort((a, b) =>
    typeof a[col] === 'string' && a[col].includes('.') ? parseFloat(b[col]) - parseFloat(a[col]) : b[col] - a[col]
  );
};

/**
 * Filter array of objects by object property.
 * Example: Filter list of users that have 'John' (and 'Tom') as their first name.
 * @param {Object} items Array of objects.
 * @param {string} col Property to filter by.
 * @param {(any|any[])} vals value(s) to filter by.
 * @returns filtered items.
 */
export const filterBy = (items, col, vals) => {
  if (typeof vals === 'object') return items.filter((item) => vals.find((val) => item[col] === val));
  return items.filter((item) => item[col] === vals);
};

/**
 * Filter array of objects without object property value(s).
 * Example: Filter list of users that do not have 'John' (or 'Tom') as their first name.
 * @param {Object} items Array of objects.
 * @param {string} col property to filter by.
 * @param {(any|any[])} vals value(s) to filter by.
 * @returns filtered items.
 */
export const filterWithout = (items, col, vals) => {
  if (typeof vals === 'object') return items.filter((item) => !vals.find((val) => item[col] === val));
  return items.filter((item) => item[col] !== vals);
};

/**
 * Iterates through an array of objects and returns an array of property value(s).
 * @param {Object} items Array of objects.
 * @param {string} col property of desired value(s).
 * @returns distinct array of property values.
 */
export const mapPropertyValues = (items, col) => {
  let vals = [];
  items.map((item) => !vals.find((val) => item[col] === val) && vals.push(item[col]));
  if (typeof vals[0] === 'number') {
    // By default, the sort method sorts elements alphabetically.
    // To sort numerically just add a new method which handles numeric sorts (sortNumber, shown below) -
    return vals.sort((a, b) => a - b).reverse();
  }
  return vals.sort();
};
