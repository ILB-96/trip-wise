"use client";
import Image from "next/image";
import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { IAttraction } from "@models/attraction";
import RatingComponent from "@/components/StarRating"; // Ensure the path is correct

import { Button } from "./ui/button";

interface PopoverProps {
  item: IAttraction;
  isOpen: boolean;
  onClose: () => void;
}

const PopoverInfo: React.FC<PopoverProps> = ({ item, isOpen, onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
          isOpen &&
          (!target.closest(".popover-info") || target.closest(".close-button"))
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto"; // Re-enable background scroll
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto"; // Ensure scroll is enabled on cleanup
    };
  }, [isOpen, onClose]);

  return (
      <>
        {isOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="popover-info bg-white rounded-lg p-8 max-w-lg max-h-screen overflow-y-auto relative">
                <div className="flex items-center mb-4">
                  <Image
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                      width={800}
                      height={500}
                      src={item.image}
                      alt={item.title}
                  />
                </div>
                <h2 className="font-semibold text-xl mb-4">{item.title}</h2>
                <div className="text-gray-600 mb-4">
                  {item.location + ", " + item.country}
                </div>
                <p className="text-gray-800 mb-4">{item.description}</p>
                <div className="mb-4">
                  <RatingComponent attractionId={item._id} />
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-wrap">
                    {item.types &&
                        item.types.map((type: string, index: number) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="transform transition-transform hover:scale-105 cursor-pointer m-1"
                            >
                              {type}
                            </Badge>
                        ))}
                  </div>
                  <div>
                    <Button
                        variant="ghost"
                        className="text-blue-600 hover:underline close-button"
                        onClick={onClose}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </>
  );
};

export default PopoverInfo;
