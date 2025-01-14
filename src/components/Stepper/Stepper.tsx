import { useReducer, useState } from 'react';
import { CalendarView } from '../CarouselView/CalendarView';
import { ServicesView } from '../ServicesView/ServicesView';
import { SpecialistView } from '../SpecialistsView/SpecialistsView';
import { createDate } from '../CalendarView/utils/createDate';
import { createMonth } from '../CalendarView/utils/createMonth';
import { createYear } from '../CalendarView/utils/createYear';

type State = {
  service: string | null;
  specialist: string | null;
  dateTime: string | null;
};

type Action =
  | { type: 'SELECT_SERVICE'; payload: string }
  | { type: 'SELECT_SPECIALIST'; payload: string }
  | { type: 'SELECT_DATE_TIME'; payload: string };

const initialState: State = {
  service: null,
  specialist: null,
  dateTime: null
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SELECT_SERVICE':
      return { ...state, service: action.payload };
    case 'SELECT_SPECIALIST':
      return { ...state, specialist: action.payload };
    case 'SELECT_DATE_TIME':
      return { ...state, dateTime: action.payload };
    default:
      return state;
  }
};
export const Stepper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(createYear().createYearMonths(), "createMonth");

  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const handleSelectService = (service: string) => {
    dispatch({ type: 'SELECT_SERVICE', payload: service });
    setCurrentViewIndex((prevIndex) => (prevIndex + 1) % views.length);
  };

  const handleSelectSpecialist = (specialist: string) => {
    dispatch({ type: 'SELECT_SPECIALIST', payload: specialist });
    setCurrentViewIndex((prevIndex) => (prevIndex + 1) % views.length);
  };

  const handleSelectDateTime = (dateTime: string) => {
    dispatch({ type: 'SELECT_DATE_TIME', payload: dateTime });
    setCurrentViewIndex((prevIndex) => (prevIndex + 1) % views.length);
  };

  const views = [
    {
      name: 'Services',
      component: () => <ServicesView onSelectService={handleSelectService} />,
      label: 'Услуга'
    },
    {
      name: 'Specialists',

      component: () => <SpecialistView onSelectSpecialist={handleSelectSpecialist} />,
      label: 'Специалист'
    },
    {
      name: 'Calendar',
      component: () => <CalendarView onSelectDateTime={handleSelectDateTime} />,
      label: 'Дата и время'
    },
    {
      name: 'Success',
      component: () => <SuccessView state={state} />,
      label: 'Подтверждение заказа'
    }
  ];
  return (
    <>
      <div style={{ height: '330px' }}>
        <div>{views[currentViewIndex].component()}</div>
      </div>
      <span>Выберите:</span>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '20px'
        }}
      >
        {views.map((view, index) => (
          <div
            key={index}
            onClick={() => setCurrentViewIndex(index)}
            style={{
              padding: '8px',
              cursor: 'pointer',
              backgroundColor:
                currentViewIndex > index
                  ? 'green'
                  : currentViewIndex === index
                  ? 'lightgray'
                  : 'white',
              border: '1px solid black',
              color: 'black'
            }}
          >
            {currentViewIndex === 3 && index === 3 ? 'Подтверждаю!' : view.label}
          </div>
        ))}
      </div>
    </>
  );
};
interface SuccessViewProps {
  state: State;
}
const SuccessView: React.FC<SuccessViewProps> = ({ state }) => {
  return (
    <div>
      Вы записаны!
      <div>{state.dateTime}</div>
      <div>{state.service}</div>
      <div>{state.specialist}</div>
    </div>
  );
};
