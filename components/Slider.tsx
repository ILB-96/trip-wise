"use client";
import * as React from "react";
import { dummyData } from "@app/attractions/page";
import { Card, CardContent } from "@components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import AttractionCard from "./AttractionCard";

export default function Slider() {
  return (
    <>
      <h2
        style={{ textAlign: "left" }}
        className="text-2xl font-semibold mb-4 pl-4"
      >
        Best Trips to Experience
      </h2>

      <div className="relative w-full max-w-none">
        <Carousel className="p-5 w-full">
          <CarouselContent className="-ml-1">
            {dummyData.map((attraction) => (
              <CarouselItem
                key={attraction.name}
                className="pl-1 basis-full sm:basis-1/2 md:basis-2/5 lg:basis-1/5" // Basis classes as previously adjusted
              >
                <div className="p-1">
                  <Card className="h-auto min-h-64">
                    {" "}
                    <CardContent className="items-center justify-center p-1">
                      {" "}
                      <AttractionCard
                        name={attraction.name}
                        image={attraction.image}
                        location={attraction.location}
                        country={attraction.country}
                        description=""
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
      </div>
    </>
  );
}
