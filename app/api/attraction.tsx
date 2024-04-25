
import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDB} from '../../utils/database';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectToDB();
    console.log("Connected to the database successfully.");
}

