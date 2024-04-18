"use client";

import FilterBar from "@components/FilterBar/FilterBar";
import React from "react";
import AttractionCard from "@components/AttractionCard";

export const dummyData = [
  {
    name: "The Eiffel Tower",
    location: "Paris, France",
    description:
      "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
  },
  {
    name: "The Great Wall of China",
    location: "Beijing, China",
    description:
      "The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
  },
  {
    name: "The Pyramids of Giza",
    location: "Giza, Egypt",
    description:
      "The Giza pyramid complex, also called the Giza Necropolis, is the site on the Giza Plateau in Greater Cairo, Egypt that includes the Great Pyramid of Giza, the Pyramid of Khafre, and the Pyramid of Menkaure, along with their associated pyramid complexes and the Great Sphinx of Giza.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
  },
  {
    name: "The Colosseum",
    location: "Rome, Italy",
    description:
      "The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum. It is the largest ancient amphitheatre ever built, and is still the largest standing amphitheatre in the world today, despite its age.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg",
  },
  {
    name: "Machu Picchu",
    location: "Cusco, Peru",
    description:
      "Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-meter (7,970 ft) mountain ridge. It is located in the Machupicchu District within Urubamba Province above the Sacred Valley, which is 80 kilometers (50 mi) northwest of Cuzco.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
  },
  {
    name: "The Taj Mahal",
    location: "Agra, India",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg",
  },
  {
    name: "The Statue of Liberty",
    location: "New York City, United States",
    description:
      "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and its metal framework was built by Gustave Eiffel.",
    image:
      "https://www.telegraph.co.uk/content/dam/travel/2021/09/28/TELEMMGLPICT000272822890_trans_NvBQzQNjv4BqgsaO8O78rhmZrDxTlQBjdLdu0TL-Cg_AMOUqySXmFgU.jpeg?imwidth=1280",
  },
];

const Attractions = () => {
  return (
    <>
      <FilterBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {dummyData.map((attraction) => (
          <AttractionCard
            key={attraction.name}
            name={attraction.name}
            image={attraction.image}
            location={attraction.location}
            description={attraction.description}
          />
        ))}
      </div>
    </>
  );
};

export default Attractions;
