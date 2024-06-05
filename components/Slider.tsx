"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import AttractionCard from "./AttractionCard";
import PopoverInfo from "./PopoverInfo";
import ThreeDotsWave from "./ThreeDotsLoading";

interface Attraction {
  name: string;
  description: string;
  types: string[];
  averageRating: number;
}

export default function Slider() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const res = await fetch("/api/attraction/getBest10Attractions");
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        const result = await res.json();
        setAttractions(result.attractions);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch attractions:", error);
        setLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  const handleClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleClose = () => {
    setSelectedAttraction(null);
  };

  if (loading) return <ThreeDotsWave />;
  if (!attractions.length) return <div>No attractions available</div>;

  return (
    <div className="max-w-8xl mx-auto px-10 py-10">
      <h2 className="text-3xl font-bold mb-6">
        Best Attractions to Experience
      </h2>

      <div className="relative w-full max-w-none">
        <Carousel className="p-5 w-full">
          <CarouselContent className="-ml-1">
            {attractions.map((attraction) => (
              <CarouselItem
                key={attraction.name}
                className="pl-1 basis-full sm:basis-1/2 md:basis-2/5 lg:basis-1/5"
                onClick={() => handleClick(attraction)}
              >
                <div className="p-1">
                  <Card className="h-auto min-h-64">
                    <CardContent className="items-center justify-center p-1">
                      <AttractionCard
                        item={{ ...attraction, description: "", types: [] }}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="arrow-container">
            <CarouselPrevious className="carousel-prev" />
            <CarouselNext className="carousel-next" />
          </div>
        </Carousel>
        {selectedAttraction && (
          <PopoverInfo
            item={selectedAttraction}
            isOpen={true}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}
