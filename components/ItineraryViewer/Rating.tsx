import React, { FC, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Import FaStar icon

interface RatingProps {
  rating?: number; // Optional initial rating
  onRate?: (newRating: number) => void; // Optional callback for onRate
}

const Rating: FC<RatingProps> = ({ rating = 0, onRate }) => {
  const [currentRating, setCurrentRating] = useState<number>(rating); // Use currentRating for visual state

  const handleClick = (newRating: number) => {
    setCurrentRating(newRating); // Update visual state immediately on click
    if (onRate) onRate(newRating);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            className={`text-3xl cursor-pointer ${
              currentRating >= ratingValue ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => handleClick(ratingValue)}
          >
            <FaStar />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
