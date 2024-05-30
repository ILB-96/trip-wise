import { connectToDB } from "@utils/database";
import Attraction from "@models/attraction";
import { NextResponse } from "next/server";
import { addAttraction } from "@lib/attraction";

const allowedDomains = [
  "upload.wikimedia.org",
  "en.wikipedia.org",
  "www.telegraph.co.uk",
  "www.nationalparks.org",
  "i0.wp.com",
  "a.cdn-hotels.com",
  "images.unsplash.com",
  "avatars.githubusercontent.com",
  "source.unsplash.com",
  "i.ibb.co",
  "lh3.googleusercontent.com",
];

const isValidImageURL = (url: string) => {
  try {
    const hostname = new URL(url).hostname;
    return allowedDomains.includes(hostname);
  } catch (e) {
    return false;
  }
};

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { title, location, country, description, image } =
      await request.json();

    if (!title || !location || !country || !description || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidImageURL(image)) {
      return NextResponse.json(
        { error: "Invalid image URL. Please use an allowed source." },
        { status: 400 }
      );
    }

    const newAttraction = new Attraction({
      title,
      location,
      country,
      description,
      image,
    });

    const result = await addAttraction(newAttraction);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Adding attraction error: " + error.message },
      { status: 500 }
    );
  }
}
