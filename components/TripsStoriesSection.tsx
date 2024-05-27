"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ITrip } from "@models/trip";
import ThreeDotsWave from "./ThreeDotsLoading";
import { addTripView } from "@lib/trips";
interface CardProps {
  title: string;
  imgUrl: string;
  onClick: () => void;
  isMain?: boolean;
}

const Card: React.FC<CardProps> = ({ title, imgUrl, onClick, isMain }) => {
  if (isMain) {
    return (
      <div
        className="relative cursor-pointer rounded-lg overflow-hidden transition duration-300 ease-in-out shadow-lg col-span-full sm:col-span-full lg:col-span-1 row-span-3"
        style={{
          height: "100%",
          maxHeight: "480px",
          minHeight: "200px",
        }}
        onClick={onClick}
      >
        <Image src={imgUrl} alt={title} fill className="object-cover" />
        <div
          className="absolute bottom-0 left-0 w-full p-4 bg-black opacity-85 flex flex-col justify-end"
          style={{ minHeight: "100px" }}
        >
          <h3 className="text-lg font-semibold text-white absolute top-2">
            {title}
          </h3>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="relative cursor-pointer rounded-lg overflow-hidden transition duration-300 ease-in-out shadow-lg bg-white hover:bg-purple-500"
        style={{ width: "100%", height: "150px", maxHeight: "300px" }} // Adjusted height
        onClick={onClick}
      >
        <div className="flex items-center h-full" style={{ padding: "10px" }}>
          <div
            style={{
              height: "100%",
              overflow: "hidden",
              borderRadius: "15px",
              minInlineSize: "100px",
            }}
          >
            <Image
              src={imgUrl}
              alt={title}
              width={150}
              height={150}
              className="rounded-l-lg object-cover h-full" // Ensure image fits the container
            />
          </div>
          <div className="p-8 flex-grow flex items-center">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-white">
              {title}
            </h3>
          </div>
        </div>
      </div>
    );
  }
};

const TripsStoriesSection: React.FC = () => {
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/trip/getLastSevenTrips");
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        const result = await res.json();
        setTrips(result.trips);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ThreeDotsWave />;

  if (!Array.isArray(trips) || trips.length === 0) {
    return <div>No trips available</div>;
  }
  const navigateToTripDetail = async (id) => {
    router.push(`/trip/${id}`); // Navigate to the trip detail page
    await addTripView(id); // Increment the view count
  };

  return (
    <div className="max-w-8xl mx-auto px-10 py-10">
      <h2 className="text-3xl font-bold mb-6">Latest Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map((trip, index) => (
          <Card
            key={trip._id}
            title={trip.title}
            imgUrl={trip.image}
            onClick={() => navigateToTripDetail(trip._id)}
            isMain={index === 0}
          />
        ))}
      </div>
      <div style={{ paddingTop: 200 }} />
    </div>
  );
};

export default TripsStoriesSection;
