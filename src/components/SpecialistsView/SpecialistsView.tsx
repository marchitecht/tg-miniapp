import styles from "./SpecialistsView.module.scss";
const specialists = [
  {
    id: 1,
    label: "Услуга 1",
    name: "Иван Иванов",
    price: 100,
  },
  {
    id: 2,
    label: "Услуга 2",
    name: "Катя Метров",
    price: 100,
  },
  {
    id: 3,
    label: "Услуга 3",
    name: "Петр Петров",
    price: 100,
  },
];
interface SpecialistsViewProps {
  onSelectSpecialist: (service: string) => void;
}
export const SpecialistView: React.FC<SpecialistsViewProps> = ({
  onSelectSpecialist,
}) => {
  return (
    <div className={styles.container}>
      {specialists.map((specialist) => (
        <div
          className={`${styles.specialist} `} // Apply glow effect to selected day
          key={specialist.id}
          onClick={() => onSelectSpecialist(specialist.name)}>
          {specialist.name}
        </div>
      ))}{" "}
    </div>
  );
};
