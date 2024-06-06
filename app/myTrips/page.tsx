"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TripCard from "@components/TripCard";
import { ITrip } from "@models/trip";
import ThreeDotsWave from "@components/ThreeDotsLoading";
import { auth } from "@auth";
import { AuthProvider } from "@context/AuthContext";
import withAuthProvider from "@app/withAuthProvider";

const MyTrips = () => {
  const { data: session, status } = useSession();
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async (email: string): Promise<string | null> => {
      try {
        const res = await fetch(`/api/user/getUserByEmail/?email=${email}`);
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        const result = await res.json();
        return result.user._id;
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
        return null;
      }
    };

    const fetchTrips = async (editorId: string) => {
      try {
        const res = await fetch(`/api/trip/${editorId}/getTripByCreator`);
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        const result = await res.json();
        console.log("Trips fetched from API:", result.trips); // Debugging line
        setTrips(result.trips);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      if (status === "loading") return;

      if (!session || !session.user) {
        setLoading(false);
        return;
      }

      const userId = await fetchUserId(session.user.email);
      if (userId) {
        fetchTrips(userId);
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]);

  if (loading) return <ThreeDotsWave />;

  if (!Array.isArray(trips) || trips.length === 0) {
    return <div>No trips available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {trips.map((trip: ITrip) => (
        <TripCard key={trip._id} trip={trip} WithCreator={false} />
      ))}
    </div>
  );
};

export default withAuthProvider(MyTrips);