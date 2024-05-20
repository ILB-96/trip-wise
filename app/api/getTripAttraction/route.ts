
import {connectToDB} from "@utils/database";
import TripAttraction from '@/models/tripAttraction';
import {NextResponse} from "@node_modules/next/server";
import Trip from "@models/trip";



export async function GET(req: Request) {
    try {
        await connectToDB();
        const tripAttraction = await TripAttraction.find({});
        return NextResponse.json({tripAttraction}, {status: 200});

    } catch (error) {
        // If something goes wrong, send a 500 - Internal Server Error
        console.error(error);
        return NextResponse.json({error: 'Internal Server Error' }, {status: 500});
    }
}


