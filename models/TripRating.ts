import mongoose, { Types, Document } from "mongoose";
import { ratingType } from "./attraction";

export interface ITripRatingBase {
  author: Types.ObjectId;
  rating: ratingType;
  tripId: Types.ObjectId;
}
export interface ITripRating extends Document, ITripRatingBase {
  createdAt: Date;
  updatedAt: Date;
}

const tripRatingSchema = new mongoose.Schema<ITripRating>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);
tripRatingSchema.index({ tripId: 1, author: 1 }, { unique: true });

const TripRating =
  mongoose.models?.TripRating ||
  mongoose.model<ITripRating>("TripRating", tripRatingSchema);
export default TripRating;

