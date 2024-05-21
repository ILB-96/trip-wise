
"use client"

import React, { useEffect, useRef, useState } from 'react';
import { dummyDays } from '@utils/dummydays';
import Image from 'next/image';
import { BackgroundGradient } from '@components/ItineraryViewer/BackgroundGradient';
import { Oswald } from 'next/font/google';
import { cn } from '@lib/utils';
import Rating from '@components/ItineraryViewer/Rating';
import { motion, useInView } from 'framer-motion';
import CommentSection from '@components/ItineraryViewer/CommentSection';
import TripCover from '@components/ItineraryViewer/TripCover';
import DaysViewer from '@components/ItineraryViewer/DaysViewer';


// const types = [
//   'Scenic',
//   'Outdoor',
//   'Historical',
//   'Cultural',
//   'Beaches',
//   'Short',
//   'Multiple days',
// ];


const getFormattedDate = (date: string) => {
  const dateObject = new Date(date);
  const formattedDate =
    `${dateObject.getDate().toString().padStart(2, '0')}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getFullYear()}`;
  return formattedDate;

}

const TripPage = ({ params }: { params: { id: string } }) => {

  const [currentRating, setCurrentRating] = useState<number>(3);
  const [trip, setTrip] = useState<any>(null);
  const [attractions, setAttractions] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTripData = async () => {
      let response = await fetch(`/api/trip/${params.id}/getTrip`, {
        method: 'GET',
      });
      const tripResult = await response.json();
      setTrip(tripResult?.trip);
      response = await fetch(`/api/trip/${params.id}/getTripAttraction`, {
        method: 'GET',
      });
      const attractionsResult = await response.json();
      setAttractions(attractionsResult.success ? attractionsResult.attractions : null);
      setLoading(!attractionsResult.success);
    }
    fetchTripData();
  }, []);

  const handleRate = (newRating: number) => {
    setCurrentRating(newRating);
    console.log('New rating:', newRating);
  };
  if (loading) {
    const loadingVariants = {
      loading: {
        scale: 1,
        opacity: 1,
        transition: { duration: 1.5, ease: 'easeInOut' },
      },
      hidden: {
        scale: 0,
        opacity: 0,
        transition: { duration: 0.5 },
      },
    };

    return (
      <motion.div
        className="loading-container fixed top-0 left-0 w-full h-full bg-gray-100 z-50"
        variants={loadingVariants}
        initial="hidden"
        animate="loading"
      >
        <motion.svg
          className="w-20 h-20 mx-auto animate-spin"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#3b82f6"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="#e0e0e0"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.div>
    );
  }
  else {
    return (
      <div className=''>
        {trip && attractions && <TripCover
          tripName={trip.title}
          tripImage={trip.image}
          numberOfDays={attractions.length}
          tripRating={trip.rating[0]}
          tripProfile={{ id: 1, name: trip.creator.name, designation: trip.creator.role, image: trip.creator.image }}
          tripCreatedAt={getFormattedDate(trip.createdAt)}
          tripCountry={trip.country}
        />
        }
        <DaysViewer tripDays={attractions} />
        <div
          className='space-y-10'
        >
          <div
            className="pl-20 flex items-center py-8 px-4 bg-gradient-to-r from-gray-100 to-teal-200 rounded-lg shadow-md"
          >
            <div className="text-center mt-2 flex space-x-5 items-center">
              <p className="text-gray-600 font-medium">How would you rate this itinerary?</p>
              <Rating rating={currentRating} onRate={handleRate} />
            </div>
          </div>
          <CommentSection tripId={params.id} />
        </div>
      </div>
    );
  }
};

export default TripPage;
