import { getNames } from "country-list";
export const tripsOptions = [
  {
    title: "Country",
    selections: getNames().sort(),
    disableMultiple: true,
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
