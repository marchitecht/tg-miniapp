import { createDate } from "./createDate";

export const getWeekDaysNumber = (
  locale: string = "default",
  firstWeekDay: number = 1
) => {
  const weekDaysNames: {
    day: ReturnType<typeof createDate>["day"];
    dayShort: ReturnType<typeof createDate>["dayShort"];
  }[] = Array.from({ length: 7 });

  const date = new Date();
  weekDaysNames.forEach((_, index) => {
    const { day, dayShort, dayNumberInWeek } = createDate({
      date: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + index
      ),
      locale,
    });
    weekDaysNames[dayNumberInWeek - 1] = {
      day,
      dayShort,
    };
  });

  return [
    ...weekDaysNames.slice(firstWeekDay - 1),
    ...weekDaysNames.slice(0, firstWeekDay - 1),
  ];
};
