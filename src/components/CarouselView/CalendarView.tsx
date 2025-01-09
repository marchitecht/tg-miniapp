import { useState } from "react";
import { DayInfo } from "../types";
import { getWeekDaysWithDates } from "../utils";
import { Carousel } from "./Carousel";
import { TimeSlots } from "../TimeSlotsView/TimeSlots";

export const CalendarView = () => {
  const currentYear = new Date().getFullYear();
  const days = getWeekDaysWithDates(currentYear);
  const currentWeekDays = days.filter((dayInfo) => dayInfo.isActualWeek);
  const todayIndex = currentWeekDays.findIndex((dayInfo) => dayInfo.isToday);
  const [selectedDay, setSelectedDay] = useState<DayInfo>(
    currentWeekDays[todayIndex]
  );
  const handleDayClick = (day: DayInfo) => {
    setSelectedDay(day);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Carousel days={days} handleDayClickForTimeSlot={handleDayClick} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TimeSlots days={days} switchDay={selectedDay} />
      </div>
    </>
  );
};
