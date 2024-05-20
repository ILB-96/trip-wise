import {connectToDB} from "@utils/database";
import Attraction from "@models/attraction";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    try {
            await connectToDB();
            const attractions = await Attraction.find({});
            return NextResponse.json({attractions}, {status: 200});

    } catch (error) {
        // If something goes wrong, send a 500 - Internal Server Error
        console.error(error);
        return NextResponse.json({error: 'Internal Server Error' }, {status: 500});

    }
}
