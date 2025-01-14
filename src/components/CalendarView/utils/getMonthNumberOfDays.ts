export const getMonthNumberOfDays = (
  monthIndex: number,
  yearNumber: number = new Date().getFullYear()
) => {
  // console.log(monthIndex, "monthIndex");

  return new Date(yearNumber, monthIndex + 1, 0).getDate();
};
