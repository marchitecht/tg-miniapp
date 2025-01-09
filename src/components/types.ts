export interface DayInfo {
  init: Date | string;
  day: string;
  date: string;
  isToday: boolean;
  isActualWeek: boolean;
}
export interface TimeSlot {
  date: string;
  time: string;
  isToday: boolean;
}
