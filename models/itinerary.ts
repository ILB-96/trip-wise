import mongoose, { Types, Document } from "mongoose";
import { IComment } from "./comment";
import { IDay } from "./day";

export const RATING_NOT_PROVIDED = -1;

export interface IItineraryBase {
    title: string;
    creator: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    days: IDay[];
}
export interface IItinerary extends Document, IItineraryBase {
    createdAt: Date;
    updatedAt: Date;
    rating?: number;
    comments?: IComment[];
    shared: boolean;
}
const itinerarySchema = new mongoose.Schema<IItinerary>({
    title: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Day' }],
    rating: { type: Number, default: RATING_NOT_PROVIDED },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    shared: { type: Boolean, default: false },
}, {
    timestamps: true
});

const Itinerary = mongoose.models?.Itinerary || mongoose.model<IItinerary>('Itinerary', itinerarySchema);
export default Itinerary;
