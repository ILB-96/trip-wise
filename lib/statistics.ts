import { getAttractionsChart } from "./attraction";
import { getTripsChart } from "./trips";
import { getUsersChart } from "./user_object_get";

export const getFormattedData = async () => {
  const { usersData } = await getUsersChart();
  const { tripsData } = await getTripsChart();
  const { attractionsData } = await getAttractionsChart();

  let data: {
    [key: string]: { user: number; trip: number; attraction: number };
  } = {}; // Add index signature to data object

  for (let item of usersData) {
    data[item.date] = { user: item.count, trip: 0, attraction: 0 };
  }
  for (let item of tripsData) {
    data[item.date] = { ...data[item.date], trip: item.count, attraction: 0 };
  }
  for (let item of attractionsData) {
    data[item.date] = { ...data[item.date], attraction: item.count };
  }

  let formattedData = [];
  for (let key in data) {
    formattedData.push({
      name: new Date(key).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      user: data[key].user || 0,
      trip: data[key].trip || 0,
      attraction: data[key].attraction || 0,
    });
  }

  return { formattedData };
};
