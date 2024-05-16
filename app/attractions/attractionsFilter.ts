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
    title: "Duration",
    selections: [
      "Short (1-3 hours)",
      "Half-day (4-6 hours)",
      "Full-day (7-10 hours)",
      "Multiple days (11 + hours)",
    ],
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
