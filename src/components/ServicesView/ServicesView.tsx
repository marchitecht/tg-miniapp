import styles from "./ServicesView.module.scss";
const services = [
  {
    id: 1,
    label: "Услуга 1",
    price: 100,
  },
  {
    id: 2,
    label: "Услуга 2",
    price: 200,
  },
  {
    id: 3,
    label: "Услуга 3",
    price: 300,
  },
];
interface ServicesViewProps {
  onSelectService: () => void;
}
export const ServicesView: React.FC<ServicesViewProps> = ({
  onSelectService,
}) => {
  return (
    <div className={styles.container}>
      {services.map((service) => (
        <div
          className={`${styles.service} `} // Apply glow effect to selected day
          key={service.id}
          onClick={onSelectService}>
          {service.label}: {service.price}
        </div>
      ))}
    </div>
  );
};
