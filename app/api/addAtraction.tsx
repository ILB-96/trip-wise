import mongoose from 'mongoose';

let is_connected = false;
const MONGO_URI: string = process.env.MONGO_URI || 'your_default_connection_string';

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (is_connected) {
        console.log('mongodb already connected');
        return;
    }
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "trip_wise" // corrected a small typo in dbName
        });
        is_connected = true; // Update connection status on successful connect
        console.log('MongoDB connection established');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}