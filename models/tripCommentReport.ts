import mongoose, { Types, Document } from "mongoose";

export interface ITripCommentReportBase {
  tripCommentId: Types.ObjectId;
  snitchId: Types.ObjectId;
  reason: string;
}
export interface ITripCommentReport extends Document, ITripCommentReportBase {
  createdAt: Date;
  updatedAt: Date;
}

const TripCommentReportSchema = new mongoose.Schema<ITripCommentReport>(
  {
    tripCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TripComment",
      required: true,
    },
    snitchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TripCommentReport =
  mongoose.models?.TripCommentReport ||
  mongoose.model<ITripCommentReport>(
    "TripCommentReport",
    TripCommentReportSchema
  );
export default TripCommentReport;
