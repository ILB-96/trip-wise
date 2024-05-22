import {connectToDB} from "@utils/database";
import Attraction from "@models/attraction";
import {NextResponse} from "@node_modules/next/server";
import {addAttraction} from "@lib/attraction";
import attraction from "@models/attraction";

export async function POST(request: Request ) {
    try {
          await connectToDB();
        const attraction = new Attraction(await request.json());
        const result = await addAttraction(attraction);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Adding comment error: "+error.message },
            { status: 500 }
        );
    }
}
// export async function POST(request: Request ) {
//     await connectToDB();
//     try {
//         const promises = dummyData.map(async (attraction) => {
//             await Attraction.updateOne(
//                 { title: attraction.title }, // Find the document with the same title
//                 { $set: attraction }, // Update with new data
//                 { upsert: true } // Insert if it doesn't exist
//             );
//         });
//
//         await Promise.all(promises);
//
//         return NextResponse.json({ message: 'Attractions added/updated successfully' }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: `Error adding attractions: ${error.message}` }, { status: 500 });
//     }
// }


