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
        date: "2022-01-01",
        visits: [
          {
            attraction: dummyAttractions[0],
            from_time: "9:00 AM",
            to_time: "11:00 AM",
          },
          {
            attraction: dummyAttractions[1],
            from_time: "12:00 PM",
            to_time: "4:00 PM",
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
        date: "2022-05-15",
        visits: [
          {
            attraction: dummyAttractions[3], // The Eiffel Tower
            from_time: "10:00 AM",
            to_time: "1:00 PM",
          },
          {
            attraction: dummyAttractions[6], // The Colosseum
            from_time: "3:00 PM",
            to_time: "6:00 PM",
          },
        ],
      },
      {
        date: "2022-05-16",
        visits: [
          {
            attraction: dummyAttractions[5], // The Great Wall of China
            from_time: "9:00 AM",
            to_time: "3:00 PM",
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
        date: "2022-09-10",
        visits: [
          {
            attraction: dummyAttractions[7], // Machu Picchu
            from_time: "5:00 AM",
            to_time: "10:00 AM",
          },
        ],
      },
      {
        date: "2022-09-12",
        visits: [
          {
            attraction: dummyAttractions[8], // The Statue of Liberty
            from_time: "1:00 PM",
            to_time: "4:00 PM",
          },
        ],
      },
    ],
    description:
      "A breathtaking adventure through the mountains and jungles of South America.",
    image: "https://source.unsplash.com/400x300/?machu,picchu",
  },
];
