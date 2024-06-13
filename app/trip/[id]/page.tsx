"use client";

import React, { useEffect, useState } from "react";
import CommentSection from "@components/ItineraryViewer/CommentSection";
import TripCover from "@components/ItineraryViewer/TripCover";
import DaysViewer from "@components/ItineraryViewer/DaysViewer";
import TripRatingComponent from "@components/tripRating";
import withAuthProvider from "@app/withAuthProvider";
import ThreeDotsWave from "@components/ThreeDotsLoading";

const getFormattedDate = (date: string) => {
  const dateObject = new Date(date);
  const formattedDate = `${dateObject.getDate().toString().padStart(2, "0")}/${(
    dateObject.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${dateObject.getFullYear()}`;
  return formattedDate;
};

const TripPage = ({ params }: { params: { id: string } }) => {
  const [trip, setTrip] = useState<any>(null);
  const [attractions, setAttractions] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchTripData = async () => {
      let response = await fetch(`/api/trip/${params.id}/getTrip`, {
        method: "GET",
      });
      const tripResult = await response.json();
      setTrip(tripResult?.trip);
      response = await fetch(`/api/trip/${params.id}/getTripAttraction`, {
        method: "GET",
      });
      const attractionsResult = await response.json();
      setAttractions(
        attractionsResult.success ? attractionsResult.attractions : null
      );
      response = await fetch(`/api/getTripRating?tripId=${params.id}`, {
        method: "GET",
      });
      const ratingResult = await response.json();
      setAverageRating(ratingResult.averageRating);
      setLoading(!attractionsResult.success);
    };
    fetchTripData();
  }, [params.id]);

  return loading ? (
    <ThreeDotsWave />
  ) : (
    <div>
      {trip && attractions && (
        <TripCover
          tripId={params.id} // Pass the tripId here
          tripName={trip.title}
          tripImage={trip.image}
          numberOfDays={attractions.length}
          averageRating={averageRating || 0}
          tripProfile={{
            id: 1,
            name: trip.creator.name,
            designation: trip.creator.role,
            image: trip.creator.image,
          }}
          tripCreatedAt={getFormattedDate(trip.createdAt)}
          tripCountry={trip.country}
        />
      )}
      <DaysViewer tripDays={attractions} />
      <div className="space-y-10">
        <div className="pl-20 flex items-center py-8 px-4 bg-gradient-to-r from-gray-100 to-teal-200 rounded-lg shadow-md">
          <div className="text-center mt-2 flex space-x-5 items-center">
            <p className="text-gray-600 font-medium">
              How would you rate this itinerary?
            </p>
            <TripRatingComponent tripId={params.id} />{" "}
            {/* Use TripRatingComponent */}
          </div>
        </div>
        <CommentSection tripId={params.id} />
      </div>
    </div>
  );
};

export default withAuthProvider(TripPage);
