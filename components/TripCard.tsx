"use client";

import React from 'react';
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { ITripWithRating } from "@lib/trips"; // Adjust the import path if necessary
import TripRatingComponent from "@/components/tripRating"; // Adjust the import path if necessary

interface TripCardProps {
    trip: ITripWithRating;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
    const router = useRouter();
    const navigateToTripDetail = () => {
        router.push(`/trip/${trip._id}`); // Navigate to the trip detail page
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
                            <Badge className="top-2 flex absolute left-2 text-green-600 px-1 py-0 transform transition-transform hover:scale-105 cursor-pointer">
                                <Eye className="w-4 h-4 mr-1" />
                                {trip.views}
                            </Badge>
                        )}
                        <p className="text-gray-600">{trip.country}</p>
                    </div>
                </div>
                <div className="p-4" onClick={stopPropagation}>
                    <TripRatingComponent tripId={trip._id} />
                </div>
            </div>
        </>
    );
};

export default TripCard;
