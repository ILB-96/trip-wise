"use client";

import React, { useEffect, useRef, useState } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader'
import ThreeDotsWave from '@components/ThreeDotsLoading';
import { Input } from '@components/ui/input';
import Image from 'next/image';
import { GoogleGenerativeAI } from '@google/generative-ai';


const genAIKey: string = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(genAIKey);

const libs: Library[] = [
    "core",
    "maps",
    "places",
    "marker"
];

const Map = (latlong: any) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
    const googleAPIKey: string = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleAPIKey,
        libraries: libs,
    });
    const mapRef = useRef<HTMLDivElement>(null);
    const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
    const [place, setSelectedPlace] = useState<string | null>(null);
    const [placeAddress, setPlaceAddress] = useState<string | null>(null);
    const [placeImage, setPlaceImage] = useState<string | null>(null);
    const [placeDetails, setPlaceDetails] = useState<string | null>(null);
    useEffect(() => {
        if (isLoaded) {
            const mapOptions = {
                center: {
                    lat: latlong.coordinates[0],
                    lng: latlong.coordinates[1],
                },
                zoom: 17,
                mapId: 'Map-Test-123'
            }
            const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);
            setMap(gMap);
            const gAutoComplete = new google.maps.places.Autocomplete(
                placeAutoCompleteRef.current as HTMLInputElement,
                {
                    fields: [
                        'place_id',
                        'name',
                        'geometry',
                        'address_components'
                    ],
                },
            );
            setAutoComplete(gAutoComplete);
        }
    }, [isLoaded]);
    const fetchImage = async (placeName: string): Promise<string> => {
        const response = await fetch(`/api/trip/unsplash/${placeName}`);
        const data = await response.json();
        // console.log(data)
        setPlaceImage(data.imgUrl);
        return data.imgUrl;
    }
    const fetchDetails = async (placeId: string, placeName: string): Promise<string | null> => {
        const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,editorialSummary&key=${googleAPIKey}`);
        const data = await response.json();
        // console.log(data);
        let placeDetails: string | null = null;
        if (!data?.editorialSummary?.text) {
            console.log("I am using the gemini api")
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(`Give me description about this place in English in 2-3 sentences, if you do not have then just make up one on your own: ${placeName}`);
            placeDetails = result.response.text();
            setPlaceDetails(placeDetails);
        }
        else {
            placeDetails = data?.editorialSummary?.text;
            setPlaceDetails(placeDetails);
        }
        return placeDetails;
    }
    const addAttraction = async (data: any) => {
        // console.log(data);
        try {
            const res = await fetch("/api/attraction/addAttraction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }
        catch (error: any) {
            console.log(`Failed to add attraction: ${error.message}`);
        }
    }
    useEffect(() => {
        if (autoComplete) {
            autoComplete.addListener('place_changed', () => {
                const retrieveAndAdd = async () => {
                    const place = autoComplete.getPlace();
                    setSelectedPlace(place?.name!);
                    if (place?.geometry) {
                        setMarker(place.geometry.location!, place.name!);
                    }
                    const image = await fetchImage(place?.name!);
                    const description = await fetchDetails(place.place_id!, place?.name!);
                    const address = place?.address_components;
                    const title = place?.name!;
                    let country = "Unknown";
                    let location = "Unknown";
                    if (address) {
                        country = address[address?.length - 1].long_name;
                        if (address.length > 1)
                            location = address[address.length - 2].long_name;
                    }
                    setPlaceAddress(JSON.stringify(address));
                    const data = {
                        title,
                        location,
                        country,
                        description,
                        image,
                    };
                    addAttraction(data);
                }
                retrieveAndAdd();
            });
        }
    }, [autoComplete]);
    const setMarker = (location: google.maps.LatLng, name: string) => {
        if (!map) return;
        map.setCenter(location);
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: location,
            title: name,
        })
    }
    return (
        <div className='flex flex-col space-y-4'>
            <Input ref={placeAutoCompleteRef} />
            {place && <p className='text-2xl'>{place}</p>}
            {placeAddress && <p className='text-xl'>{placeAddress}</p>}
            {placeImage && <Image src={placeImage} alt='' width={300} height={300} />}
            {placeDetails && <p className='text-xl'>{placeDetails}</p>}
            {isLoaded ? (
                <div style={{ height: '600px' }} ref={mapRef} />) : (
                <ThreeDotsWave />
            )}
        </div>
    )
}

export default Map