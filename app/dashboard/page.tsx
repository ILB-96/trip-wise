import Card from "@components/dashboard/card/Card";
import Chart from "@components/dashboard/chart/Chart";
import styles from "@components/dashboard/dashboard.module.css";
import { getAttractionsChart, getAttractionsStatistics } from "@lib/attraction";
import { getFormattedData } from "@lib/statistics";
import { getTripsChart, getTripsStatistics } from "@lib/trips";
import { getUsersChart, getUsersStatistics } from "@lib/user_object_get";
import { Users, FerrisWheel, Plane } from "lucide-react";

const Dashboard = async () => {
  const { totalUsers, usersChange } = await getUsersStatistics();
  const { totalTrips, tripsChange } = await getTripsStatistics();
  const { totalAttractions, attractionsChange } =
    await getAttractionsStatistics();
  const { formattedData } = await getFormattedData();
  const cards = [
    {
      title: "Total Users",
      number: totalUsers,
      change: usersChange,
      icon: <Users size={24} />,
    },
    {
      title: "Total Trips",
      number: totalTrips,
      change: tripsChange,
      icon: <Plane size={24} />,
    },
    {
      title: "Total Attractions",
      number: totalAttractions,
      change: attractionsChange,
      icon: <FerrisWheel size={24} />,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className="flex items-center">
          <div className="w-full flex max-sm:flex-col">
            {cards.map((card) => (
              <Card key={card.title} item={card} />
            ))}
          </div>
        </div>
        <Chart data={formattedData} />
      </div>
      <div className={styles.side}></div>
    </div>
  );
};

export default Dashboard;
