"use client";

import React from 'react';
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Eye, MessageSquareMore } from "lucide-react";
import { ITripWithRating, addTripView } from "@lib/trips"; // Adjust the import path if necessary
import TripRatingComponent from "@/components/tripRating"; // Adjust the import path if necessary

interface TripCardProps {
  trip: ITripWithRating;
  WithCreator?: boolean;
}

const TripCard: React.FC<TripCardProps> = ({ trip, WithCreator = true }) => {
  const router = useRouter();
  const navigateToTripDetail = async () => {
    router.push(`/trip/${trip._id}`); // Navigate to the trip detail page
    await addTripView(trip._id); // Increment the views count
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-xl relative">
        <div className="cursor-pointer" onClick={navigateToTripDetail}>
          <div className="flex items-center">
            <Image
              className="w-full h-48 object-cover"
              width={500}
              height={300}
              src={trip.image}
              alt={trip.title}
              priority
            />
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-xl">{trip.title}</h2>
            {trip.views && (
              <Badge className="top-2 flex bg-blue-300/60 absolute left-2 text-black px-1 py-0 transform transition-transform hover:scale-105 cursor-pointer">
                <Eye className="w-4 h-4 mr-1" />
                {trip.views}
              </Badge>
            )}
            {trip.commentsCount >= 0 && (
              <Badge className="top-8 flex absolute left-2 bg-yellow-300/60  text-bkacj px-1 py-0 transform transition-transform hover:scale-105 cursor-pointer">
                <MessageSquareMore className="w-4 h-4 mr-1" />
                {trip.commentsCount}
              </Badge>
            )}
            <p className="text-gray-600">{trip.country}</p>
            {WithCreator && (
              <p className="text-gray-600">{"By " + trip.creator.name}</p>
            )}
            <div onClick={stopPropagation} style={{ marginBottom: "10px" }}>
              <TripRatingComponent tripId={trip._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripCard;
