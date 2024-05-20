import {getTripById, getTripsByEditor} from '@/lib/trips';
import {NextResponse} from "@node_modules/next/server";

export async function GET(request: Request, { params }: { params: { editorId: string } }) {
    try {
        const trips = await getTripsByEditor(params.editorId);
        return NextResponse.json({trips});

    } catch (error: any) {
        return NextResponse.json(
            {error: "Fetching comments error: " + error.message},
            {status: 500}
        );
    }
}

