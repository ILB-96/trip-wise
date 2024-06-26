import attractionRating from "@models/attractionRating";
import TripRating from "@/models/tripRating";
import { ratingType } from "@models/attraction";


export function getRatingForAttraction(ratings: ratingType[]) {
  const ratingCount = ratings.length;
  const convertRatings: number[] = ratings as number[];
  const totalRatings = convertRatings.reduce((sum, rating) => sum + rating, 0);
  const averageRating = ratingCount === 0 ? 0 : totalRatings / ratingCount;
  return {
    averageRating: parseFloat(averageRating.toFixed(1)), // Keep one decimal point
    ratingCount
  };
}

export async function calculateAverageRating(attractionId) {
  const ratings = await attractionRating.find({ attractionId }).select('rating');
  const ratingCount = ratings.length;
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = ratingCount === 0 ? 0 : totalRatings / ratingCount;

  return {
    averageRating: parseFloat(averageRating.toFixed(1)), // Keep one decimal point
    ratingCount
  };
}
export async function calculateTripAverageRating(tripId) {
  const ratings = await TripRating.find({ tripId }).select('rating');
  const ratingCount = ratings.length;
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = ratingCount === 0 ? 0 : totalRatings / ratingCount;

  return {
    averageRating: parseFloat(averageRating.toFixed(1)), // Keep one decimal point
    ratingCount
  };
}
