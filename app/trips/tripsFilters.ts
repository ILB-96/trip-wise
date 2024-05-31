import { getNames } from "country-list";
export const tripsOptions = {
  country: {
    title: "Country",
    selections: getNames().sort(),
    disableMultiple: true,
  },
  rating: {
    title: "Rating",
    selections: [
      "⭐ and up",
      "⭐⭐ and up",
      "⭐⭐⭐ and up",
      "⭐⭐⭐⭐ and up",
      "⭐⭐⭐⭐⭐",
    ],
    disableMultiple: true,
  },
  sortBy: {
    title: "Sort By",
    selections: ["Rating", "Views", "Newest", "Oldest"],
    disableMultiple: true,
  },
};
