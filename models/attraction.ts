import mongoose, { Schema, Document } from 'mongoose';
import {ITripComment} from "@models/tripComment";

export type ratingType = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export interface IAttraction extends Document {
  title: string;
  location: string;
  country: string;
  price?: string;
  rating?: ratingType[];
  description: string;
  image: string;
  types?: string[];
}


const attractionSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: String },
  rating: [{ type: Number, default: 0 }],
  description: { type: String, required: true },
  image: { type: String, required: true },
  types: [{ type: String }],
});
const Attraction =
    mongoose.models?.Attraction ||
    mongoose.model<IAttraction>("Attraction", attractionSchema);

export default Attraction;



