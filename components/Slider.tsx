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
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {dummyData.map((attraction) => (
          <CarouselItem
            key={attraction.name}
            className="pl-1 md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">
                    {
                      <AttractionCard
                        name={attraction.name}
                        image={attraction.image}
                        location={attraction.location}
                        description={""}
                      />
                    }
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
