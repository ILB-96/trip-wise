import Attraction, { IAttraction } from '../models/attraction';
import { connectToDB } from '../utils/database';

export const addAttraction = async (attractionData: IAttraction): Promise<IAttraction> => {
    await connectToDB();
    const attraction = new Attraction(attractionData);
    await attraction.save();
    return attraction;
};

export const getAllAttractions = async (): Promise<IAttraction[]> => {
    await connectToDB();
    return Attraction.find({});
};

export const getAttractionById = async (id: string): Promise<IAttraction | null> => {
    await connectToDB();
    return Attraction.findById(id);
};

