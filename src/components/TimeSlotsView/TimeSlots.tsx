import { useState } from "react";
import { getCurrentTimeSlot } from "../utils";
import styles from "./TimeSlots.module.scss";
import { DayInfo } from "../types";
import { format, addHours, startOfDay, isBefore, endOfDay } from "date-fns";

interface TimeSlotsProps {
  days: DayInfo[];
  switchDay: DayInfo | undefined;
}

interface TimeSlot {
  date: string;
  time: string;
  isToday: boolean;
}

export const createTimeSlots = (days: DayInfo[]): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  days.forEach((day) => {
    const formattedDate = format(day.init, "yyyy-MM-dd");
    let currentHour = startOfDay(day.init);

    while (isBefore(currentHour, endOfDay(day.init))) {
      const time = format(currentHour, "HH:00");
      slots.push({ date: formattedDate, time, isToday: day.isToday });
      currentHour = addHours(currentHour, 1);
    }
  });

  return slots;
};

export const TimeSlots: React.FC<TimeSlotsProps> = ({ days, switchDay }) => {
  const timeSlots: TimeSlot[] = createTimeSlots(days);
  const selectedDay = days[days.findIndex((day) => day.isToday)];

  const selectedDaySlots = timeSlots.filter(
    (slot) => slot.date === format(selectedDay.init, "yyyy-MM-dd")
  );
  const currentTimeSlot =
    selectedDaySlots.find(
      (slot) =>
        slot.time === getCurrentTimeSlot() &&
        slot.date === format(new Date(), "yyyy-MM-dd")
    ) || selectedDaySlots[0];
  const switchedDay = format(switchDay?.init ?? new Date(), "yyyy-MM-dd");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    currentTimeSlot.time
  );
  const handleDayClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot.time);
  };

  return (
    <div>
      <div className={styles.slotContainer}>
        <div className={styles.wrapper}>
          {selectedDaySlots.map((slot) => {
            console.log(slot, "SLOT");

            return (
              <div
                className={`${styles.slot}
                ${
                  selectedTimeSlot === slot.time &&
                  switchedDay === slot.date &&
                  switchDay?.isToday === slot.isToday
                    ? styles.selected
                    : ""
                }    
                `}
                key={`${slot.date}-${slot.time}`}
                onClick={() => handleDayClick(slot)}>
                {slot.time}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
