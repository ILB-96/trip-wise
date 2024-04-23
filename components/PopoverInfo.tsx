"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MouseEventHandler } from "react";
import { Button } from "./ui/button";

interface PopoverProps {
  image: string;
  name: string;
  location: string;
  country: string;
  description: string;
  badges: string[];
  isOpen: boolean;
  onClose: () => void;
}

const PopoverInfo: React.FC<PopoverProps> = ({
  image,
  name,
  location,
  country,
  description,
  badges,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".popover-info")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="popover-info bg-white rounded-lg p-8 max-w-lg max-h-screen overflow-y-auto">
            <div className="flex items-center">
              <Image
                className="w-full h-full object-cover rounded-xl shadow-lg"
                width={800}
                height={500}
                src={image}
                alt={name}
              />
            </div>
            <h2 className="font-semibold text-xl mb-4">{name}</h2>
            <div className="text-gray-600 mb-4">
              {location + ", " + country}
            </div>
            <p className="text-gray-800 mb-4">{description}</p>
            <div className="grid grid-flow-col">
              <div className="flex justify-start">
                {badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="transform transition-transform hover:scale-105 cursor-pointer"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:underline"
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
