import mongoose, { Types, Document } from "mongoose";
import { ratingType } from "./attraction";


export interface IAttractionRatingBase {
  author: Types.ObjectId;
  rating: ratingType;
  attractionId: Types.ObjectId;
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
    attractionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attraction",
      required: true,
    },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

attractionRatingSchema.index({ attractionId: 1, author: 1 }, { unique: true });

const AttractionRating =
    mongoose.models?.AttractionRating ||
    mongoose.model<IAttractionRating>("AttractionRating", attractionRatingSchema);
export default AttractionRating;
