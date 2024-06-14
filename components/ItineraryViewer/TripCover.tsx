import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { AnimatedTooltip } from "./AnimatedToolTip";
import { Button } from "@components/ui/button";
import HeartInteraction from "./HeartInteraction";

export interface TripCoverUserProfile {
  id: number;
  name: string;
  designation: string;
  image: string;
}

const TripCover = ({
  tripId,
  tripName,
  tripImage,
  numberOfDays,
  averageRating,
  tripProfile,
  tripCreatedAt,
  tripCountry,
}: {
  tripId: string;
  tripName: string;
  tripImage: string;
  numberOfDays: number;
  averageRating: number;
  tripProfile: TripCoverUserProfile;
  tripCreatedAt: string;
  tripCountry: string;
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<Star key={i} size={25} fill="gold" stroke="gold" />);
      } else if (rating >= i + 0.5) {
        stars.push(<div key={i} style={{ position: 'relative', display: 'inline-block' }}>
          <Star size={25} fill="gray" stroke="gray" />
          <div style={{ position: 'absolute', overflow: 'hidden', width: '50%', top: 0, left: 0 }}>
            <Star size={25} fill="gold" stroke="gold" />
          </div>
        </div>);
      } else {
        stars.push(<Star key={i} size={25} fill="gray" stroke="gray" />);
      }
    }
    return stars;
  };

  return (
    <div className="relative w-full h-[500px] max-w-8xl mx-auto">
      <Image
        src={tripImage}
        alt=""
        priority
        quality={100}
        className="z-0 brightness-50 object-cover"
        fill
      />
      <div className="z-10 relative flex flex-col justify-end min-h-[26rem] pt-15 text-4xl text-white px-20">
        <h1 className="font-bold text-[var(--fs-400)] leading-[calc(2.25*var(--gs))] tracking-tighter">
          {tripName}
        </h1>
        <div>
          <div className="text-xl">
            <span className="items-center inline-flex pt-2">
              {renderStars(averageRating)}{" "}
              {/* Render stars based on averageRating */}
            </span>
          </div>
          <div className="pt-5 text-[#e2e2e2] text-xl">
            <div className="items-center">
              <span className="font-bold">{`${numberOfDays} days`}</span>
              <span> in </span>
              <span className="font-bold">{tripCountry}</span>
            </div>
            <span>{`Created at ${tripCreatedAt} - by`}</span>
            <div className="flex items-center space-x-5 mt-3">
              <AnimatedTooltip items={[tripProfile]} />
              <span className="font-semibold text-orange-300 italic pl-3">
                {tripProfile.name}
              </span>
            </div>
          </div>
          <div className="flex space-x-5">
            <HeartInteraction tripId={tripId} /> {/* Pass the tripId here */}
            <Button className=" bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-300 mt-10 text-center">
              ➕Duplicate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCover;