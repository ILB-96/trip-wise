import { DataItem } from "@components/FilterBar/FilterBar";

const sortData = (data: DataItem[], sortBy: string) => {
  switch (sortBy) {
    case "Price Ascending":
      return data.sort((a, b) => {
        const priceA = a.price || "";
        const priceB = b.price || "";
        if (priceA === priceB) return 0;
        if (priceA === "") return 1;
        if (priceB === "") return -1;
        if (priceA === "Free") return -1;
        if (priceB === "Free") return 1;
        return priceA.length - priceB.length;
      });
    case "Price Descending":
      return data.sort((a, b) => {
        const priceA = a.price || "";
        const priceB = b.price || "";
        if (priceA === priceB) return 0;
        if (priceA === "Free") return 1;
        if (!priceA) return 1;
        if (!priceB) return -1;
        if (priceB === "Free") return -1;
        return priceB.length - priceA.length;
      });
    case "Rating":
      return data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "Duration Descending":
      return data.sort((a, b) => {
        const durationA = a.duration || "";
        const durationB = b.duration || "";
        if (durationA === durationB) return 0;
        if (!durationA) return 1;
        if (!durationB) return -1;
        const durA = parseInt(durationA.split("(")[1].split(" ")[0]);
        const durB = parseInt(durationB.split("(")[1].split(" ")[0]);

        return (durB || 0) - (durA || 0);
      });

    case "Duration Ascending":
      return data.sort((a, b) => {
        const durationA = a.duration || "";
        const durationB = b.duration || "";
        if (durationA === durationB) return 0;
        if (!durationA) return 1;
        if (!durationB) return -1;
        const durA = parseInt(durationA.split("(")[1].split(" ")[0]);
        const durB = parseInt(durationB.split("(")[1].split(" ")[0]);

        return (durA || 0) - (durB || 0);
      });
    default:
      return data;
  }
};
export default sortData;
