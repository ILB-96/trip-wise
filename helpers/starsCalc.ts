import { ratingType } from "@models/attraction";

export const getStars = (ratings: ratingType[]): ratingType => {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0;
  }

  const result =
    ratings.reduce(
      (sum: number, currentValue: ratingType) => sum + currentValue,
      0
    ) / ratings.length;

  return getClosestRating(result);
};

const getClosestRating = (average: number): ratingType => {
  const roundedAverage = (Math.floor(average * 2) / 2) as ratingType;

  // Ensure the rounded value is a valid ratingType
  const validRatings: ratingType[] = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5,
  ];
  return validRatings.find((rating) => rating === roundedAverage) ?? 0;
};
