import { useCalendar } from './useCalendar';
import styles from './Calendar.module.scss';
import { ArrowLeft } from './ArrowLeft';
import { ArrowRight } from './ArrowRight';
import { checkDateIsEqual, checkIsToday } from './utils';
interface CalendarProps {
  locale?: string;
  selectDate: (date: Date) => void;
  selectedDate: Date;
  firstWeekDay?: number;
  range?: [Date, Date];
}
// console.log(getMonthNames(), 'getMonthNames');

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, selectDate }) => {
  const { state, functions } = useCalendar({ selectedDate });
  //   console.log(state, 'state');

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <ArrowLeft />
        {state.mode === 'days' && (
          <div aria-hidden className={styles.monthName} onClick={() => functions.setMode('months')}>
            {state.monthNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'months' && (
          <div aria-hidden onClick={() => functions.setMode('years')} className={styles.monthName}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div aria-hidden className={styles.monthName}>
            {state.selectedYearInterval[0]} - {state.selectedYearInterval.length - 1}
          </div>
        )}
        <ArrowRight />
      </div>
      <div className={styles.calendarBody}>
        {state.mode === 'days' && (
          <>
            <div className={styles.calendarWeekNames}>
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className={styles.calendarDays}>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDate = checkDateIsEqual(day.date, state.selectedDay.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
                return (
                  <div
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    className={[
                      styles.calendarDay,
                      isToday ? styles.calendarTodayItem : '',
                      isSelectedDate ? styles.calendarSelectedItem : '',
                      isAdditionalDay ? styles.calendarAdditionalDay : ''
                    ].join(' ')}
                    onClick={() => selectDate(day.date)}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
