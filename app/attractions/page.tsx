"use client";

import FilterBar from "@components/FilterBar/FilterBar";
import { useCallback, useState, useRef, useEffect } from "react";
import AttractionCard from "@components/AttractionCard";
import { getNames } from "country-list";
export const dummyData = [
  {
    name: "The Grand Canyon",
    location: "Arizona",
    country: "United States",
    price: "$",
    rating: 4.8,
    description:
      "The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles long, up to 18 miles wide and attains a depth of over a mile.",
    image:
      "https://www.nationalparks.org/uploads/_1200x630_crop_center-center_82_none/shutterstock_97706066_1.jpg?mtime=1655840475",
    types: ["Scenic", "Outdoor"],
    duration: "Full-day (7-10 hours)",
  },
  {
    name: "Petra",
    location: "Ma'an Governorate",
    country: "Jordan",
    price: "$$",
    rating: 4.7,
    description:
      "Petra, originally known to its inhabitants as Raqmu, is a historical and archaeological city in southern Jordan. Petra lies around Jabal Al-Madbah in a basin surrounded by mountains which form the eastern flank of the Arabah valley that runs from the Dead Sea to the Gulf of Aqaba.",
    image:
      "https://i0.wp.com/thethrillofpursuit.com/wp-content/uploads/2023/07/Petra-cathedral-panoramic.jpg?fit=1366%2C1025&ssl=1",
    types: ["Historical", "Cultural"],
    duration: "Full-day (7-10 hours)",
  },
  {
    name: "Santorini",
    location: "Cyclades",
    country: "Greece",
    price: "$$$",
    rating: 4.9,
    description:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.",
    image:
      "https://a.cdn-hotels.com/gdcs/production18/d1838/041ae6b1-0a88-4c22-a648-53a22dd4a006.jpg",
    types: ["Scenic", "Beaches"],
    duration: "Multiple days (11 + hours)",
  },
  {
    name: "The Eiffel Tower",
    location: "Paris",
    country: "France",
    price: "Free",
    rating: 1.5,
    description:
      "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    types: ["Historical", "Outdoor"],
    duration: "Short (1-3 hours)",
  },
  {
    name: "The Great Wall of China",
    location: "Beijing",
    country: "China",
    rating: 4.5,
    price: "$$$",
    description:
      "The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    types: ["Kids-Friendly", "Historical", "Outdoor"],
    duration: "Half-day (4-6 hours)",
  },
  {
    name: "The Pyramids of Giza",
    location: "Giza",
    country: "Egypt",
    price: "Free",
    rating: 3,
    description:
      "The Giza pyramid complex, also called the Giza Necropolis, is the site on the Giza Plateau in Greater Cairo, Egypt that includes the Great Pyramid of Giza, the Pyramid of Khafre, and the Pyramid of Menkaure, along with their associated pyramid complexes and the Great Sphinx of Giza.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
    duration: "Full-day (7-10 hours)",
  },
  {
    name: "The Colosseum",
    location: "Rome",
    country: "Italy",
    description:
      "The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum. It is the largest ancient amphitheatre ever built, and is still the largest standing amphitheatre in the world today, despite its age.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg",
    duration: "Multiple days (11 + hours)",
  },
  {
    name: "Machu Picchu",
    location: "Cusco",
    country: "Peru",
    price: "$$$$",
    rating: 5,
    description:
      "Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-meter (7,970 ft) mountain ridge. It is located in the Machupicchu District within Urubamba Province above the Sacred Valley, which is 80 kilometers (50 mi) northwest of Cuzco.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
    types: ["Exotic"],
    duration: "Short (1-3 hours)",
  },
  {
    name: "The Taj Mahal",
    location: "Agra",
    country: "India",
    price: "$$",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg",
    types: ["Cultural"],
    duration: "Full-day (7-10 hours)",
  },
  {
    name: "The Statue of Liberty",
    location: "New York City",
    country: "United States",
    price: "$$$",
    description:
      "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and its metal framework was built by Gustave Eiffel.",
    image:
      "https://www.telegraph.co.uk/content/dam/travel/2021/09/28/TELEMMGLPICT000272822890_trans_NvBQzQNjv4BqgsaO8O78rhmZrDxTlQBjdLdu0TL-Cg_AMOUqySXmFgU.jpeg?imwidth=1280",
    types: ["Kids-Friendly", "Historical", "Outdoor"],
    duration: "Multiple days (11 + hours)",
  },
];

let options = [
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
export type AttractionType = {
  name: string;
  location: string;
  country: string;
  price?: string;
  rating?: number;
  description: string;
  image: string;
  types?: string[];
  duration?: string;
};

const Attractions = () => {
  const [filteredData, setFilteredData] = useState<AttractionType[]>(
    () => dummyData
  );

  if (!options[2].selections.length) {
    const attractionTypes = Array.from(
      new Set(dummyData.map((attraction) => attraction.types).flat())
    );

    options[2].selections = attractionTypes.filter(
      (type) => type !== undefined && type.trim() !== ""
    );
  }

  const handleDataChange = (data: AttractionType[]) => {
    setFilteredData(data);
  };

  return (
    <>
      <FilterBar
        options={options}
        data={dummyData}
        onDataChange={handleDataChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {dummyData &&
          filteredData.map((attraction) => (
            <AttractionCard
              key={attraction.name}
              name={attraction.name}
              image={attraction.image}
              location={attraction.location}
              country={attraction.country}
              description={attraction.description}
              types={attraction.types ? attraction.types : []}
              price={attraction.price ? attraction.price : undefined}
              rating={attraction.rating ? attraction.rating : undefined}
              duration={
                attraction.duration
                  ? attraction.duration.split("(")[1].slice(0, -1)
                  : undefined
              }
            />
          ))}
      </div>
    </>
  );
};

export default Attractions;
