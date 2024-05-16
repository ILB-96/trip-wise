import mongoose, { Types } from "mongoose";

export interface IActivity {
    name: string;
    startTime: string; // for example: "10:00 am"
    image: string;
    duration?: number; // in hours if null means the whole day or something
}

export interface IDay extends Document {
    itineraryId: Types.ObjectId;
    dayNumber: number;
    activities: IActivity[];
}

const daySchema = new mongoose.Schema<IDay>({
    itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary', required: true },
    dayNumber: { type: Number, required: true },
    activities: [{
        name: { type: String, required: true },
        startTime: { type: String, required: true },
        image: { type: String, required: true },
        duration: { type: Number, required: false },
    }]
});

const Day = mongoose.models?.Day || mongoose.model<IDay>('Day', daySchema);
export default Day;