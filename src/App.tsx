import { useState } from 'react';
import './App.css';
import { Calendar } from './components/CalendarView/Calendar';
import { formatDate } from './components/CalendarView/utils';
// import { getMonthNames } from "./components/CalendarView/utils/getMonthNames";
// import { Stepper } from "./components/Stepper/Stepper";
import styles from './components/CalendarView/Calendar.module.scss';

import { useInitData } from '@vkruglikov/react-telegram-web-app';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [initDataUnsafe] = useInitData();
  const [initDataUnsafe, initData] = useInitData();
  console.log(initDataUnsafe);
  console.log(initData);

  return (
    <>
      <div className={styles.dateContainer}>{formatDate(selectedDate, 'DD.MM.YYYY')}</div>

      <Calendar selectedDate={selectedDate} selectDate={setSelectedDate} />
    </>
  );
}

export default App;
