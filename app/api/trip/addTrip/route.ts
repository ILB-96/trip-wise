import { addTrip } from '@lib/trips';
import {connectToDB} from "@utils/database";
import {NextResponse} from "@node_modules/next/server";
import Trip from "@models/trip";


export async function POST(request: Request ) {
    try {
        await connectToDB();
        const trip = new Trip(await request.json());
        const result = await addTrip(trip);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Adding comment error: "+error.message },
            { status: 500 }
        );
    }
}