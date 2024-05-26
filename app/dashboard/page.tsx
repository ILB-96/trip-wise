import Card from "@components/dashboard/card/Card";
import Chart from "@components/dashboard/chart/Chart";
import styles from "@components/dashboard/dashboard.module.css";
const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
];
const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Chart />
      </div>
      <div className={styles.side}></div>
    </div>
  );
};

export default Dashboard;
