import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { query: string } }) {
    try {
        await connectToDB();
        const searchedContacts = await User.find({
            $or: [
                { email: { $regex: params.query, $options: 'i' } },
                { name: { $regex: params.query, $options: 'i' } }
            ]
        });
        return NextResponse.json(searchedContacts);
        
    } catch (error: any) {
        return NextResponse.json(
            { error: "Fetching user search query error: "+error.message },
            { status: 500 }
        );
    }
}