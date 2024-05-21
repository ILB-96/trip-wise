import mongoose, { Types } from "mongoose";

export interface ITripAttraction extends Document {
  tripId: Types.ObjectId;
  attractionId: Types.ObjectId;
  day: Date;
}

const tripAttractionSchema = new mongoose.Schema<ITripAttraction>(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    attractionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attraction",
      required: true,
    },
    day: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const TripAttraction =
  mongoose.models?.TripAttraction ||
  mongoose.model<ITripAttraction>("TripAttraction", tripAttractionSchema);
export default TripAttraction;
