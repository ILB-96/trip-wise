import { getNames } from "country-list";

export let attractionsFilter = [
  {
    title: "Country",
    selections: getNames().sort(),
    disableMultiple: true,
  },
  {
    title: "Location",
    selections: [],
  },
  {
    title: "Types",
    selections: [],
  },
  {
    title: "Price Range",
    selections: ["Free", "$", "$$", "$$$", "$$$$", "$$$$$"],
  },
  {
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
  {
    title: "Sort By",
    selections: [
      "Price Ascending",
      "Price Descending",
      "Rating",
      "Duration Ascending",
      "Duration Descending",
    ],
    disableMultiple: true,
  },
];
