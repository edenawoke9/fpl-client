// Sort array elements by element attribute.
// Example: sort list of users by their first name.
export const sortBy = (items, col) => {
  //
  // Example:
  //  1234
  //  '12.3'
  //  '2023-08-31T08:55:15.272751Z'
  //
  // return items.sort((a, b) => b[col] - a[col] );
  return items.sort((a, b) =>
    typeof a[col] === 'string' && a[col].includes('.')
      ? parseFloat(b[col]) - parseFloat(a[col])
      : b[col] - a[col]
  );
  // return items.sort((a, b) => {
  //   if (typeof a[col] === 'string' && a[col].includes('.')) {
  //     return parseFloat(b[col]) - parseFloat(a[col]);
  //   }
  //   return b[col] - a[col];
  // });
};

// Filter array elements by element attribute.
// Example: filter list of users that have 'John' as their first name.
export const filterBy = (items, col, vals) => {
  if (typeof vals === 'object')
    return items.filter((item) => vals.find((val) => item[col] === val));
  return items.filter((item) => item[col] === vals);
};
