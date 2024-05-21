
import {connectToDB} from "@utils/database";
import {NextResponse} from "@node_modules/next/server";
import { getAllSharedTrips } from "@lib/trips";

export async function GET(req: Request) {
    try {
        await connectToDB();
        const trips = await getAllSharedTrips();
        return NextResponse.json({trips}, {status: 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Internal Server Error' }, {status: 500});
    }
}
