"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import StarRating from "@components/StarRating";
import { useRouter } from "next/navigation";
import { TripType } from "@app/trips/page";
import { Eye } from "lucide-react";

const TripCard = (trip: TripType) => {
  const router = useRouter();

  const navigateToTripDetail = () => {
    router.push("/trip"); // Navigate to the trip detail page
  };

  return (
    <>
      <div
        className="rounded-lg overflow-hidden shadow-xl cursor-pointer relative"
        onClick={navigateToTripDetail}
      >
        <div className="flex items-center">
          {trip.image && (
            <Image
              className="w-full h-48 object-cover"
              width={500}
              height={300}
              src={trip.image}
              alt={trip.name}
              priority
            />
          )}
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-xl">{trip.name}</h2>
          {trip.views && (
            <Badge
              className={
                (trip.price ? "top-8" : "top-2") +
                " flex absolute left-2 text-green-600 px-1 py-0 transform transition-transform hover:scale-105 cursor-pointer"
              }
            >
              <Eye className="w-4 h-4 mr-1" />
              {trip.views}
            </Badge>
          )}
          {trip.rating && <StarRating rating={trip.rating} />}
          <p className="text-gray-600">{trip.country}</p>
          <p className="text-gray-800">{trip.description}</p>
        </div>
      </div>
    </>
  );
};

export default TripCard;
