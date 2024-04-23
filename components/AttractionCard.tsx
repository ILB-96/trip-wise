"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import StarRating from "@components/StarRating";
import PopoverInfo from "./PopoverInfo";
interface CardProps {
  name: string;
  image: string;
  location: string;
  country: string;
  description: string;
  types?: string[];
  price?: string | undefined;
  rating?: number | undefined;
  duration?: string | undefined;
}

const AttractionCard: React.FC<CardProps> = ({
  name,
  image,
  location,
  country,
  description,
  types = [],
  price,
  rating,
  duration,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div
        className="rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-[102%] cursor-pointer relative"
        onClick={togglePopup}
      >
        <div className="flex items-center">
          <Image
            className="w-full h-48 object-cover"
            width={500}
            height={300}
            src={image}
            alt={name}
            priority
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl">{name}</h2>
          </div>
          {duration && (
            <Badge
              className={
                (price ? "top-8" : "top-2") +
                " flex absolute left-2 text-green-600 px-1 py-0 transform transition-transform hover:scale-105 cursor-pointer"
              }
            >
              {duration}
            </Badge>
          )}
          {price && (
            <Badge className="flex absolute top-2 left-2 text-green-600 px-1 py-0 transform transition-transform hover:scale-105 cursor-pointer">
              {price}
            </Badge>
          )}
          {rating && <StarRating rating={rating} />}
          <p className="text-gray-600">{location + ", " + country}</p>
          <p className="text-gray-800">{description}</p>
          <div>
            {types.map((type, index) => (
              <Badge
                key={index}
                className="transform transition-transform hover:scale-105 cursor-pointer"
                variant="secondary"
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <PopoverInfo
        image={image}
        name={name}
        location={location}
        country={country}
        description={description}
        badges={types}
        isOpen={showPopup}
        onClose={togglePopup}
      />
    </>
  );
};

export default AttractionCard;
