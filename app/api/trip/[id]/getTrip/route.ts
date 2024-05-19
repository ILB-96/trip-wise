import { NextApiRequest, NextApiResponse } from 'next';
import { getTripById } from '@/lib/trips';
import {getComments} from "@lib/comments";
import {NextResponse} from "@node_modules/next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const trip = await getTripById(params.id);
        return NextResponse.json({trip});

    } catch (error: any) {
        return NextResponse.json(
            {error: "Fetching comments error: " + error.message},
            {status: 500}
        );
    }
}

