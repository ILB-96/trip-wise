import React from 'react';

interface StarDisplayProps {
    averageRating: number;
}

const StarDisplay: React.FC<StarDisplayProps> = ({ averageRating }) => {
    const getStarColor = (index: number) => {
        const starValue = index + 1;
        if (averageRating >= starValue) {
            return "gold";
        } else if (averageRating >= starValue - 0.5) {
            return "gold";
        } else {
            return "gray";
        }
    };

    return (
        <div>
            {Array.from({ length: 5 }, (_, index) => (
                <span key={index} style={{ color: getStarColor(index) }}>
          ★
        </span>
            ))}
        </div>
    );
};

export default StarDisplay;
