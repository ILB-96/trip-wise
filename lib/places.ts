import { GoogleGenerativeAI } from '@google/generative-ai';
import { fetchUnsplashImage } from './unsplash';

export const googleAPIKey: string = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;
export const genAIKey: string = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(genAIKey);

export interface PlaceAddress {
    country: string;
    location: string;
}
export const fetchImage = async (placeName: string): Promise<string> => {
    const result = await fetchUnsplashImage(placeName);
    return result;
}
export const fetchDetails = async (placeId: string, placeName: string): Promise<string | null> => {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,editorialSummary&key=${googleAPIKey}`);
    const data = await response.json();
    let placeDetails: string | null = null;
    if (!data?.editorialSummary?.text) {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`Give me description about this place in English in 2-3 sentences, if you do not have then just make up one on your own: ${placeName}`);
        placeDetails = result.response.text();
    }
    else {
        placeDetails = data?.editorialSummary?.text;
    }
    return placeDetails;
}
export const getPlaceAddress = (addressComponent: google.maps.GeocoderAddressComponent[] | undefined): PlaceAddress => {
    let country = "Unknown";
    let location = "Unknown";
    if (addressComponent) {
        country = addressComponent.find((component) => component.types.includes("country"))?.long_name || "Unknown";
        if (addressComponent.length > 1) {
            location = addressComponent.find((component) => component.types.includes("locality"))?.long_name ||
                addressComponent.find((component) => !component.types.includes("country"))?.long_name ||
                "Unknown";
        }
    }
    // console.log(`Country: ${country}, Location: ${location}`);
    return { country, location };
}