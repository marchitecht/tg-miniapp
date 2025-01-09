import { useState } from "react";
import { createTimeSlots, getCurrentTimeSlot } from "../utils";
import styles from "./TimeSlots.module.scss";
import { DayInfo, TimeSlot } from "../types";
import { format } from "date-fns";

interface TimeSlotsProps {
  days: DayInfo[];
  switchDay: DayInfo | undefined;
}

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
      <span>Выберите подходящее время</span>
      <div className={styles.slotContainer}>
        <div className={styles.wrapper}>
          {selectedDaySlots.map((slot) => {
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
