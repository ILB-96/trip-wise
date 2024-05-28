
import {connectToDB} from "@utils/database";
import {NextResponse} from "@node_modules/next/server";
import User from "@models/user";

export async function GET(req: Request) {
    try {
        await connectToDB();
        const allUsers = await User.find({});
        return NextResponse.json(allUsers, {status: 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Failed to fetch all users.' }, {status: 500});
    }
}
