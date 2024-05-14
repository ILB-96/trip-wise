import { getNames } from "country-list";
export const tripsOptions = [
  {
    title: "Country",
    selections: getNames().sort(),
    disableMultiple: true,
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
      "Rating",
      "Views",
      "Duration Ascending",
      "Duration Descending",
    ],
    disableMultiple: true,
  },
];
