export const getWeekNumber = (date: Date) => {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays =
    (date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000);

  return Math.ceil((numberOfDays + oneJan.getDay()) / 7);
};
