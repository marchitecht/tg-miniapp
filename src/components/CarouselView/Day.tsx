import styles from "./Carousel.module.scss";
import { DayInfo } from "../types";

interface DayProps {
  dayInfo: DayInfo;
  index: number;
  selectedDayIndex: number | null;
  handleDayClick: (index: number, ref: React.RefObject<HTMLDivElement>) => void;
  dayRef: React.RefObject<HTMLDivElement>;
}
export const Day: React.FC<DayProps> = ({
  dayInfo,
  index,
  selectedDayIndex,
  handleDayClick,
  dayRef,
}) => {
  return (
    <div
      className={`${styles.day} ${
        selectedDayIndex === index ? styles.currentDay : ""
      }`} // Apply glow effect to selected day
      key={dayInfo.day}
      ref={dayRef}
      onClick={() => handleDayClick(index, dayRef)} // Update selected day on click
      style={{
        fontWeight: selectedDayIndex === index ? "bold" : "lighter",
      }}>
      {dayInfo.day}: {dayInfo.date}
    </div>
  );
};
