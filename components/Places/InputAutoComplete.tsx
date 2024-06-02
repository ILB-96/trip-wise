"use client"

import ThreeDotsWave from '@components/ThreeDotsLoading';
import { Library } from '@googlemaps/js-api-loader';
import { PlaceAddress, getPlaceAddress, googleAPIKey } from '@lib/places';
import { useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react'

export interface InputAutoCompleteProps {
    id: string;
    type: string;
    className: string;
    onChange: (e: any) => void;
}
const libs: Library[] = [
    "core",
    "places",
];

const InputAutoComplete = ({ id, type, className, onChange }: InputAutoCompleteProps) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleAPIKey,
        libraries: libs,
    });
    const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [inputText, setInputText] = useState<string>("");
    useEffect(() => {
        if (isLoaded) {
            const gAutoComplete = new google.maps.places.Autocomplete(
                placeAutoCompleteRef.current as HTMLInputElement,
                {
                    fields: [
                        'place_id',
                        'name',
                        'address_components'
                    ],
                },
            );
            setAutoComplete(gAutoComplete);
        }
    }, [isLoaded]);
    const addAttraction = async (data: any) => {
        try {
            if (data.title == null || data.location == null || data.country == null || data.description == null || data.image == null) {
                return;
            }
            await fetch("/api/attraction/addAttraction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setInputText("");
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
                    const address = place?.address_components;
                    const title = place?.name!;
                    const placeAddress: PlaceAddress = getPlaceAddress(address);
                    const response = await fetch(`/api/attraction/generator/?placeId=${place.place_id!}&placeName=${title}`);
                    const resultData = await response.json();
                    const { image, description } = resultData;
                    const { location, country } = placeAddress;
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
    return (
        <>
            {isLoaded ? (<input
                ref={placeAutoCompleteRef}
                className={className}
                id={id}
                type={type}
                onChange={(e) => {
                    setInputText(e.target.value);
                    onChange(e);
                }}
                value={inputText}
            />) : (<ThreeDotsWave />)}

        </>
    )
}

export default InputAutoComplete