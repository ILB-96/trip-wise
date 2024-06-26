"use client";

import { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";

interface TripRatingComponentProps {
    tripId: string;
}

const TripRatingComponent: React.FC<TripRatingComponentProps> = ({ tripId }) => {
    const { user } = useAuth();
    const [averageRating, setAverageRating] = useState<number>(0);
    const [ratingCount, setRatingCount] = useState<number>(0);
    const [message, setMessage] = useState('');
    const [userRating, setUserRating] = useState<number | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null); // Add hoverRating state
    const [loading, setLoading] = useState(true);

    const fetchRatings = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/getTripRating?tripId=${tripId}`);
            const data = await response.json();
            if (response.ok) {
                setAverageRating(data.averageRating);
                setRatingCount(data.ratingCount);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error fetching ratings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, [tripId]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleRating = async (newRating: number) => {
        if (!user) {
            setMessage("You need to be logged in to rate.");
            return;
        }
        if (!user._id) {
            setMessage("Invalid user ID.");
            console.error("Invalid user ID:", user);
            return;
        }
        const requestData = { tripId, rating: newRating, userId: user._id };
        console.log('Submitting rating:', requestData); // Log the request data

        try {
            const response = await fetch('/api/submitTripRating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
            if (response.ok) {
                const data = await response.json(); // Parse the JSON data from the response
                setMessage('Rating submitted successfully'); // Optionally use the message from the response: data.message
                setAverageRating(data.newAverageRating || 0); // Update average rating
                setRatingCount(data.newRatingCount || 0); // Update rating count
                setUserRating(newRating);
                console.log('Updated averageRating:', data.averageRating); // Log updated state
                console.log('Updated ratingCount:', data.ratingCount);
                await fetchRatings();
            } else {
                const errorData = await response.json(); // Parse the JSON data to get the error message
                setMessage(errorData.error); // Display the error message from the response
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            alert("step bad");
            setMessage(`Error submitting rating`);
        }
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLSpanElement>, index: number) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const width = rect.width;
        const isHalfStar = offsetX < width / 2;
        setHoverRating(index + (isHalfStar ? 0.5 : 1)); // Set hover rating
    };

    const handleMouseLeave = () => {
        setHoverRating(null);
    };

    const getStarColor = (index: number) => {
        const rating = hoverRating ?? averageRating;
        const starValue = index + 1;
        if (rating >= starValue) {
            return "gold";
        } else if (rating >= starValue - 0.5) {
            return "gold";
        } else {
            return "gray";
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <div>
                {Array.from({ length: 5 }, (_, index) => {
                    const starValue = index + 1;
                    const isHalfStar = hoverRating
                        ? hoverRating >= starValue - 0.5 && hoverRating < starValue
                        : averageRating >= starValue - 0.5 && averageRating < starValue;
                    const isFullStar = hoverRating
                        ? hoverRating >= starValue
                        : averageRating >= starValue;
                    return (
                        <span
                            key={index}
                            onMouseOver={(event) => handleMouseOver(event, index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={(event) => {
                                const target = event.target as HTMLElement;
                                const rect = target.getBoundingClientRect();
                                const offsetX = event.clientX - rect.left;
                                const width = rect.width;
                                const isHalfClick = offsetX < width / 2;
                                handleRating(index + (isHalfClick ? 0.5 : 1));
                            }}
                            style={{
                                cursor: "pointer",
                                color: getStarColor(index),
                                position: "relative",
                            }}
                        >
              {isHalfStar ? (
                  <>
                  <span
                      style={{
                          position: "absolute",
                          overflow: "hidden",
                          width: "50%",
                          color: "gold",
                      }}
                  >
                    ★
                  </span>
                      <span style={{ color: "gray" }}>★</span>
                  </>
              ) : (
                  "★"
              )}
            </span>
                    );
                })}
            </div>
            {message && <p>{message}</p>}
            <p>
                Average Rating: {averageRating} ({ratingCount} ratings)
            </p>
        </div>
    );
};

export default TripRatingComponent;
