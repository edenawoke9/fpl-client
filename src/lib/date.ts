export const copyrightYears = () => {
  const currYear = new Date().getFullYear();
  if (currYear > 2023) return `2023-${currYear}`;
  return `${currYear}`;
};
