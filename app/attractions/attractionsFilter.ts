import { getNames } from "country-list";

export let attractionsFilter = {
  country: {
    title: "Country",
    selections: getNames().sort(),
    disableMultiple: true,
  },
  location: {
    title: "Location",
    selections: ["No cities found"],
  },
  types: {
    title: "Types",
    selections: [],
  },
  price: {
    title: "Price Range",
    selections: ["Free", "$$", "$$$", "$$$$", "$$$$$"],
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
  },
  sortBy: {
    title: "Sort By",
    selections: ["Price Ascending", "Price Descending", "Rating"],
  },
};
