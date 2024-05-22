import { Star, StarHalf } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { ratingType } from "@models/attraction";

const StarRating: React.FC<{ rating: ratingType }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      return (
        <Star
          key={`full-star-${index}`}
          size={15}
          fill="yellow"
          strokeWidth={0}
        />
      );
    } else if (index === fullStars && halfStar) {
      return (
        <StarHalf
          key={`half-star-${index}`}
          size={15}
          fill="yellow"
          strokeWidth={0}
        />
      );
    } else {
      return <div key={`empty-star-${index}`} />;
    }
  });

  return (
    <Badge className="flex absolute top-2 right-2 px-0.5 py-0 transform transition-transform hover:scale-105 cursor-pointer">
      <div className="flex">{stars}</div>
    </Badge>
  );
};

export default StarRating;
