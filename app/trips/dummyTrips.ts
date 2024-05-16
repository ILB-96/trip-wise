import { dummyAttractions } from "@app/attractions/dummyAttractions";
import { TripType } from "./page";

export const dummyTrips: TripType[] = [
  {
    name: "Tsukiji Fish Market",
    rating: 3,
    views: 1000,
    country: "Japan",
    days: [
      {
        date: new Date("2022-01-01"),
        visits: [
          {
            attraction: dummyAttractions[0],
            fromTime: "9:00 AM",
            toTime: "11:00 AM",
          },
          {
            attraction: dummyAttractions[1],
            fromTime: "12:00 PM",
            toTime: "4:00 PM",
          },
        ],
      },
    ],
    description: "The world's largest fish market.",
    image: "https://source.unsplash.com/400x300/?tsukiji",
  },
  {
    name: "Historical Europe",
    rating: 4.7,
    views: 1500,
    country: "Germany",
    days: [
      {
        date: new Date("2022-05-15"),
        visits: [
          {
            attraction: dummyAttractions[3], // The Eiffel Tower
            fromTime: "10:00 AM",
            toTime: "1:00 PM",
          },
          {
            attraction: dummyAttractions[6], // The Colosseum
            fromTime: "3:00 PM",
            toTime: "6:00 PM",
          },
        ],
      },
      {
        date: new Date("2022-05-16"),
        visits: [
          {
            attraction: dummyAttractions[5], // The Great Wall of China
            fromTime: "9:00 AM",
            toTime: "3:00 PM",
          },
        ],
      },
    ],
    description: "Explore the rich history of Europe's iconic landmarks.",
    image: "https://source.unsplash.com/400x300/?europe,landmarks",
  },
  {
    name: "Adventure in South America",
    rating: 4.3,
    views: 950,
    country: "Peru",
    days: [
      {
        date: new Date("2022-09-10"),
        visits: [
          {
            attraction: dummyAttractions[7], // Machu Picchu
            fromTime: "5:00 AM",
            toTime: "10:00 AM",
          },
        ],
      },
      {
        date: new Date("2022-09-12"),
        visits: [
          {
            attraction: dummyAttractions[8], // The Statue of Liberty
            fromTime: "1:00 PM",
            toTime: "4:00 PM",
          },
        ],
      },
    ],
    description:
      "A breathtaking adventure through the mountains and jungles of South America.",
    image: "https://source.unsplash.com/400x300/?machu,picchu",
  },
];
