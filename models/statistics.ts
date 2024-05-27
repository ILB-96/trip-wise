import mongoose, { Document, Schema } from "mongoose";

export interface IStatistics extends Document {
  date: Date;
  visit: number;
  click: number;
}

const statisticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  visit: {
    type: Number,
    default: 0,
  },
  click: {
    type: Number,
    default: 0,
  },
});

const Statistics =
  mongoose.models?.Statistics ||
  mongoose.model<IStatistics>("Statistics", statisticsSchema);
export default Statistics;
