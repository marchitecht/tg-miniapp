import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import { Day } from "./Day";
import { DayInfo } from "../types";

interface CarouselProps {
  days: DayInfo[];
  handleDayClickForTimeSlot: (day: DayInfo) => void;
}
export const Carousel: React.FC<CarouselProps> = ({
  days,
  handleDayClickForTimeSlot,
}) => {
  const currentWeekDays = days.filter((dayInfo) => dayInfo.isActualWeek);
  const todayIndex = currentWeekDays.findIndex((dayInfo) => dayInfo.isToday);
  // State to track the selected day
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(
    todayIndex
  );
  const handleDayClick = (
    index: number,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    handleDayClickForTimeSlot(currentWeekDays[index]);
    setSelectedDayIndex(index);
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  const currentDayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the current day when the component mounts
    if (currentDayRef.current) {
      currentDayRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, []);
  return (
    <div className={styles.carouselContainer}>
      <span>Выберите день</span>
      <div className={styles.wrapper}>
        {currentWeekDays.map((dayInfo, index) => {
          const dayRef = dayInfo.isToday
            ? currentDayRef
            : useRef<HTMLDivElement | null>(null);
          return (
            <Day
              key={dayInfo.day}
              dayInfo={dayInfo}
              index={index}
              selectedDayIndex={selectedDayIndex}
              handleDayClick={handleDayClick}
              dayRef={dayRef}
            />
          );
        })}
      </div>
    </div>
  );
};
