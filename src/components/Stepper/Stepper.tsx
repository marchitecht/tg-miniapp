import { useState } from "react";
import { CalendarView } from "../CarouselView/CalendarView";
import { ServicesView } from "../ServicesView/ServicesView";
import { SpecialistView } from "../SpecialistsView/SpecialistsView";

const views = [
  {
    name: "Services",
    component: (onSelectService: () => void) => (
      <ServicesView onSelectService={onSelectService} />
    ),
    label: "Выберите услугу",
  },
  {
    name: "Specialists",
    component: (onSelectSpecialist: () => void) => (
      <SpecialistView onSelectSpecialist={onSelectSpecialist} />
    ),
    label: "Выберите специалиста",
  },
  {
    name: "Calendar",
    component: (onSelectDateTime: () => void) => (
      <CalendarView onSelectDateTime={onSelectDateTime} />
    ),
    label: "Выберите дату и время",
  },
  {
    name: "Success",
    component: () => <div>Вы записаны!</div>,
    label: "Подтверждение заказа",
  },
];
export const Stepper = () => {
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  //   const handleNext = () => {
  //     setCurrentViewIndex((prevIndex) => (prevIndex + 1) % views.length);
  //   };

  //   const handlePrevious = () => {
  //     setCurrentViewIndex(
  //       (prevIndex) => (prevIndex - 1 + views.length) % views.length
  //     );
  //   };
  const handleSelectService = () => {
    setCurrentViewIndex((prevIndex) => (prevIndex + 1) % views.length);
  };
  return (
    <>
      <div style={{ height: "330px" }}>
        <div>{views[currentViewIndex].component(handleSelectService)}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}>
        {views.map((view, index) => (
          <div
            key={index}
            onClick={() => setCurrentViewIndex(index)}
            style={{
              padding: "8px",
              cursor: "pointer",
              backgroundColor:
                currentViewIndex === index ? "lightgray" : "white",
              border: "1px solid black",
              color: "black",
              marginTop: "55px",
            }}>
            {currentViewIndex === 3 && index === 3 ? "Готово!" : view.label}
          </div>
        ))}
      </div>
      {/* <button onClick={handlePrevious} disabled={currentViewIndex === 0}>
        {views[currentViewIndex].label}
      </button>
      <button
        onClick={handleNext}
        disabled={currentViewIndex === views.length - 1}>
        {currentViewIndex < views.length - 1
          ? views[currentViewIndex + 1].label
          : "Finish"}
      </button> */}
    </>
  );
};
