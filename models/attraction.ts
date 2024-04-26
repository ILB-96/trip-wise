import mongoose, { Schema, Document } from 'mongoose';

interface IAttraction extends Document {
    name: string;
    location: string;
    country: string;
    price?: string;
    rating?: number;
    description: string;
    image?: string;
    types?: string[];
    duration: string;
}

const attractionSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true, unique:true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    price: { type: String },
    rating: { type: Number },
    description: { type: String ,required: true},
    image: { type: String },
    types: { type: [String]},
    duration: { type: String }
});
const Attraction = mongoose.model<IAttraction>('Attraction', attractionSchema);

export default Attraction;



