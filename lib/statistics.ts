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
  // Add the rest of the days of the last 6 days that were not in the data objects
  let today = new Date();
  for (let i = 6; i >= 0; i--) {
    let date = new Date();
    date.setDate(today.getDate() - i);
    let key = date.toISOString().split("T")[0];
    // console.log(key);
    if (!data[key]) {
      data[key] = { user: 0, trip: 0, attraction: 0 };
    }
  }
  // sort the data object by date
  data = Object.keys(data)
    .sort()
    .reduce((acc, key: string) => {
      acc[key] = data[key];
      return acc;
    }, {} as { [key: string]: { user: number; trip: number; attraction: number } });

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
