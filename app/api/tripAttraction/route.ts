
import {connectToDB} from "@utils/database";
import TripAttraction from '@/models/tripAttraction';
import {NextResponse} from "@node_modules/next/server";


export async function POST(request: Request ) {
    try {
        await connectToDB();
        const tripAttraction = new TripAttraction(await request.json());
        await tripAttraction.save();
        return NextResponse.json(tripAttraction);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Adding comment error: "+error.message },
            { status: 500 }
        );
    }
}
