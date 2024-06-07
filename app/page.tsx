"use client";

import Link from "next/link";
import TripsStoriesSection from "@components/TripsStoriesSection";
import { Carousel, IAttractionWithRating } from "@components/Home/AttractionCarousel";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ThreeDotsWave from "@components/ThreeDotsLoading";

const Home = () => {
  const session = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [bestAttractions, setBestAttractions] = useState<IAttractionWithRating[]>([]);
  useEffect(() => {
    const fetchBestAttractions = async () => {
      const response = await fetch("/api/attraction/getTenBest");
      const result = await response.json();
      if(response.ok) {
        setLoading(false);
        setBestAttractions(result);
      }
    }
    fetchBestAttractions();
  }, []);
  return (
    loading ? <ThreeDotsWave /> : 
    <>
      <div
        className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-shadow z-10"
        style={{ backgroundImage: "url('/assets/images/mountain.png')" }}
      >
        <h1 className="text-6xl mb-5">
          Discover story-worthy travel moments
        </h1>
        <p className="text-2xl mb-5">Plan Your Trip - Travel Like a Pro</p>
        <Link
          href={session?.data?.user ? "/planTrip" : "/auth/login"}
          className="mt-5 py-3 px-6 text-lg bg-purple-700 rounded-full hover:bg-purple-800 transition-colors cursor-pointer"
        >
          START
        </Link>
      </div>
      <div
        className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-shadow z-10"
        style={{ backgroundImage: "url('/assets/images/plane.png')" }}
      >
        <h1 className="text-6xl">Share your experience with the world</h1>
        <Link
          href={session?.data?.user ? "/planTrip" : "/auth/login"}
          className="mt-5 py-3 px-6 text-lg bg-purple-700 rounded-full hover:bg-purple-800 transition-colors cursor-pointer"
        >
          SHARE
        </Link>
        {/*<ScrollButton scrollTo={2 * window.innerHeight} />*/}
      </div>
      {/* <Slider /> */}
      {bestAttractions?.length && <Carousel bestAttractions={bestAttractions}/>}
      {/* <div className="h-[300vh]" /> */}
      <TripsStoriesSection />
    </>
  );
};

export default Home;
