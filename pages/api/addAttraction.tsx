import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDB} from '../../utils/database';
import Attraction from '../../models/attraction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDB();

        if (req.method === 'POST') {
            // Assuming you send attraction data as a JSON in the request body
            const attraction_value = req.body;
            // Create a new attraction instance
            const attraction = new Attraction(attraction_value);
            // Save the attraction to the database
            await attraction.save();
            // Send a success response
            res.status(201).json({ message: 'New attraction added', attraction });
        } else if (req.method === 'GET') {
            // Handle GET requests to fetch attractions
            const attractions = await Attraction.find({});
            res.status(200).json(attractions);
        } else {
            // If not a POST request, send 405 - Method Not Allowed
            res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        // If something goes wrong, send a 500 - Internal Server Error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
