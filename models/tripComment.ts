import mongoose, { Types, Document } from "mongoose";

export interface ITripCommentBase {
  author: Types.ObjectId;
  content: string;
  tripId: Types.ObjectId;
}
export interface ITripComment extends Document, ITripCommentBase {
  createdAt: Date;
  updatedAt: Date;
}

const tripCommentSchema = new mongoose.Schema<ITripComment>(
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
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const TripComment =
  mongoose.models?.TripComment ||
  mongoose.model<ITripComment>("TripComment", tripCommentSchema);
export default TripComment;
