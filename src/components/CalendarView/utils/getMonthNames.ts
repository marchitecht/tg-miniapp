import { createDate } from "./createDate";

export const getMonthNames = (locale: string = "default") => {
  const monthesNames: {
    month: ReturnType<typeof createDate>["month"];
    monthShort: ReturnType<typeof createDate>["monthShort"];
    monthIndex: ReturnType<typeof createDate>["monthIndex"];
    date: ReturnType<typeof createDate>["date"];
  }[] = Array.from({ length: 12 });
  const d = new Date();
  monthesNames.forEach((_, index) => {
    const { month, monthShort, monthIndex, date } = createDate({
      date: new Date(d.getFullYear(), d.getMonth() + index, d.getDate()),
      locale,
    });
    monthesNames[index] = {
      month,
      monthShort,
      monthIndex,
      date,
    };
  });

  return monthesNames;
};
