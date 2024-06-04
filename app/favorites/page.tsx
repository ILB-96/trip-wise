"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Favorites: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    if (session) {
      axios
        .get(`/api/user/${session.user.id}/favorites`)
        .then((response) => {
          setFavorites(response.data.favorites);
        })
        .catch((error) => {
          console.error("Error fetching favorite trips:", error);
        });
    } else {
      router.push("/auth/login");
    }
  }, [session]);

  const handleRemove = async (tripId: string) => {
    try {
      await axios.post(`/api/user/${session?.user.id}/removeFavorite`, {
        tripId,
      });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((trip) => trip._id !== tripId)
      );
    } catch (error) {
      console.error("Error removing favorite trip:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {favorites.map((trip) => (
          <div
            key={trip._id}
            className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <Image
              src={trip.image}
              alt={trip.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center mb-2">
                {trip.title}
              </h2>
              <button
                onClick={() => router.push(`/trip/${trip._id}`)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                View Trip
              </button>
              <button
                onClick={() => handleRemove(trip._id)}
                className="mt-2 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favorites;
