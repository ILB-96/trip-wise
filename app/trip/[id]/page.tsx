
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
    const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };

    return (
      <motion.div
      className="fixed top-0 left-0 w-full h-full bg-gray-900 z-50 flex items-center justify-center"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
        variants={{
          scale: {
            from: 0,
            to: 1,
          },
          rotate: {
            from: 0,
            to: 360,
          },
        }}
        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
      />
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
