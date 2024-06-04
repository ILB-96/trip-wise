"use client";
import { useRef, useState } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "@store/hooks";
import DaysViewer from "@components/ItineraryViewer/DaysViewer";
import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import { RootState } from "@store/store";
import { useSession } from "next-auth/react";
import ThreeDotsWave from "@components/ThreeDotsLoading";
export default function PreviewTrip() {
  const router = useRouter();
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
  }
  const session = useSession()?.data;
  const [status, setStatus] = useState<string>("");
  const tripName = useAppSelector((state: RootState) => state.tripName.value);
  const preview = useAppSelector((state: RootState) => state.preview.value);
  const dateRange = useAppSelector((state: RootState) => state.dateRange.value);
  const selectedAttractions = useAppSelector(
    (state: RootState) => state.selectedAttractions.value
  );
  const isPrivate = useAppSelector((state: RootState) => state.isPrivate.value);

  const handleSubmit = async () => {
    if (
      !tripName ||
      !selectedAttractions.length ||
      !dateRange?.from ||
      !dateRange?.to
    ) {
      setStatus("Please fill out all required fields.");
      return;
    }

    setStatus("Sending...");
    const formData = {
      title: tripName,
      startDate: dateRange.from,
      endDate: dateRange.to,
      creator: session?.user?.id,
      image: selectedAttractions[0].attractionId.image,
      country: selectedAttractions[0].attractionId.country,
      shared: !isPrivate,
    };

    const response = await fetch("/api/trip/addTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      const tripId = data._id;
      setStatus("Trip Created successfully!");
      Array.from(selectedAttractions).forEach(async (val) => {
        const attractionData = {
          tripId: tripId,
          attractionId: val.attractionId._id,
          day: val.day,
        };
        const re = await fetch("/api/tripAttraction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attractionData),
        });
        if (!re.ok) {
          setStatus("Failed to Add Attractions.");
        }
        console.log(await re.json());
      });
      // go to trip/tripId with nextjs router
      router.push(`/trip/${tripId}`);
    } else {
      setStatus("Failed to Create Trip.");
      console.log(await response.json());
    }
  };

  return (
    <div className="py-4">
      {status === "Sending..." && (
        <div className="absolute left-1/2 top-1/2 z-50">
          <ThreeDotsWave />
        </div>
      )}
      {status && (
        <h1 className="pl-4 text-2xl font-bold text-red-500 absolute">
          {status}
        </h1>
      )}
      <h1 className="flex justify-center text-2xl font-bold">{tripName}</h1>
      <DaysViewer tripDays={preview} />
      <div className="space-x-2 flex justify-center">
        <Button onClick={handleSubmit}>Create Trip</Button>
        <Button variant="outline" onClick={() => router.push("/planTrip")}>
          Edit Trip
        </Button>
      </div>
    </div>
  );
}
