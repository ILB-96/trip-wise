"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import StarRating from "@components/StarRating";
import PopoverInfo from "./PopoverInfo";
import AddDateButton from "./AddDateButton";
import { AttractionType } from "@app/attractions/page";
import { DateRange } from "react-day-picker";
import "@styles/globals.css";
interface CardProps {
  item: AttractionType;
  addAction?: (attraction: AttractionType, date: Date | undefined) => void;
  dateRange?: DateRange | undefined;
}

const AttractionCard: React.FC<CardProps> = ({
  item,
  addAction,
  dateRange,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-xl cursor-pointer relative">
        <div onClick={togglePopup}>
          <div className="flex items-center ">
            <Image
              className="w-full object-cover overflow-hidden h-52"
              width={500}
              height={300}
              src={item.image}
              alt={item.name}
              priority
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="font-semibold text-xl truncate">{item.name}</h2>
            </div>
            {item.price && (
              <Badge className="flex absolute top-2 left-2 text-green-600 px-1 py-0 transform transition-transform hover:scale-105 cursor-pointer">
                {item.price}
              </Badge>
            )}
            {item.rating && <StarRating rating={item.rating} />}
            <p className="text-gray-600 truncate">
              {item.location + ", " + item.country}
            </p>
            {item.description !== "" && (
              <p className="text-gray-800 truncate">{item.description}</p>
            )}
            <div>
              {item?.types &&
                item?.types.map((type: string, index: number) => (
                  <Badge
                    key={index}
                    className={
                      "transform transition-transform hover:scale-105 cursor-pointer"
                    }
                    variant="secondary"
                  >
                    {type}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
        {addAction && (
          <div className="flex float-end absolute top-10 right-1  ">
            <AddDateButton
              attraction={item}
              addAction={addAction}
              dateRange={dateRange}
            />
          </div>
        )}
      </div>
      <PopoverInfo item={item} isOpen={showPopup} onClose={togglePopup} />
    </>
  );
};

export default AttractionCard;
