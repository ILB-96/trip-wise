import { NextResponse } from 'next/server';
import { getAttractionById } from '@lib/attraction';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const attraction = await getAttractionById(params.id);
        if (!attraction) {
            return NextResponse.json({ error: 'Attraction not found' }, { status: 404 });
        }
        return NextResponse.json(attraction, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch attraction: ' + error.message }, { status: 500 });
    }
}


