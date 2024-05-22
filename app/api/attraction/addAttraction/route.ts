import {connectToDB} from "@utils/database";
import Attraction from "@models/attraction";
import {NextResponse} from "@node_modules/next/server";
import {addAttraction} from "@lib/attraction";

export async function POST(request: Request ) {
    try {
      const attraction = new Attraction(await request.json());
      const result = await addAttraction(attraction);
      return NextResponse.json(result);
    } catch (error: any) {
      return NextResponse.json(
        { error: "Adding comment error: " + error.message },
        { status: 500 }
      );
    }
}

