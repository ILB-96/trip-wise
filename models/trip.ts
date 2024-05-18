import mongoose, { Types, Document } from "mongoose";
import { ratingType } from "./attraction";
import { ITripComment } from "./tripComment";

export interface ITrip extends Document {
  createdAt: Date;
  updatedAt: Date;
  title: string;
  creator: Types.ObjectId;
  tripAttractionId: Types.ObjectId[];
  comments: ITripComment[];
  startDate: Date;
  endDate: Date;
  views?: number;
  rating?: ratingType[];
  shared: boolean;
}
const tripSchema = new mongoose.Schema<ITrip>(
  {
    title: { type: String, required: true, unique: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    views: { type: Number, default: 1 },
    rating: [{ type: Number, default: [0] }],
    shared: { type: Boolean, default: false },
    tripAttractionId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TripAttraction",
        required: true,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TripComment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.models?.Trip || mongoose.model<ITrip>("Trip", tripSchema);
export default Trip;
