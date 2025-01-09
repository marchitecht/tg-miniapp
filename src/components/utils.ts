import {
  startOfYear,
  addDays,
  format,
  isSameDay,
  endOfYear,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  startOfDay,
  isBefore,
  endOfDay,
  addHours,
} from "date-fns";
import { ru } from "date-fns/locale";
import { DayInfo, TimeSlot } from "./types";

export const getWeekDaysWithDates = (year: number): DayInfo[] => {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(yearStart);
  const today = new Date();
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 }); // Assuming the week starts on Monday
  const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const daysOfYear = [];
  let currentDay = yearStart;

  while (currentDay <= yearEnd) {
    daysOfYear.push({
      init: currentDay,
      day: format(currentDay, "EEEE", { locale: ru }), // Full name of the day in Russian
      date: format(currentDay, "d MMMM", { locale: ru }), // Date in "d MMMM" format, e.g., "5 января"
      isToday: isSameDay(currentDay, today), // Check if the current day is today,
      isActualWeek: isWithinInterval(currentDay, {
        start: currentWeekStart,
        end: currentWeekEnd,
      }), // Check if the day is in the current week
    });
    currentDay = addDays(currentDay, 1);
  }

  return daysOfYear;
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    slots.push(time);
  }
  console.log(slots);

  return slots;
};

export const getCurrentTimeSlot = () => {
  const currentHour = new Date().getHours();
  return currentHour < 10 ? `0${currentHour}:00` : `${currentHour}:00`;
};

export const createTimeSlots = (days: DayInfo[]): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  days.forEach((day) => {
    const formattedDate = format(day.init, "yyyy-MM-dd");
    let currentHour = addHours(startOfDay(day.init), 10); // Start from 10 AM

    while (isBefore(currentHour, addHours(startOfDay(day.init), 22))) {
      // End before 10 PM
      const time = format(currentHour, "HH:00");
      slots.push({ date: formattedDate, time, isToday: day.isToday });
      currentHour = addHours(currentHour, 1);
    }
  });
  console.log(slots);

  return slots;
};
