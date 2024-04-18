import React from "react";
import Image from "next/image";
interface CardProps {
  name: string;
  image: string;
  location: string;
  description: string;
}
const AttractionCard: React.FC<CardProps> = ({
  name,
  image,
  location,
  description,
}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <Image
        className="w-full h-48 object-cover"
        width={300}
        height={200}
        src={image}
        alt={name}
      />
      <div className="p-4">
        <h2 className="font-semibold text-xl">{name}</h2>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default AttractionCard;
