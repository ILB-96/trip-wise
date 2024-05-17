import mongoose, { Types, Document } from "mongoose";
import { ratingType } from "./attraction";

export interface IAttractionRatingBase {
  author: Types.ObjectId;
  rating: ratingType;
  tripId: Types.ObjectId;
}
export interface IAttractionRating extends Document, IAttractionRatingBase {
  createdAt: Date;
  updatedAt: Date;
}

const attractionRatingSchema = new mongoose.Schema<IAttractionRating>(
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

const TripRating =
  mongoose.models?.TripRating ||
  mongoose.model<IAttractionRating>("TripRating", attractionRatingSchema);
export default TripRating;
