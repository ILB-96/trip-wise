import Map from '@components/Places/Map'
import React from 'react'

const PlacesPage = () => {
    const coordinates = { lat: 37.7749, lng: -122.4194 };
    return (
        <div>
                <Map coordinates={[coordinates.lat, coordinates.lng]} />
        </div>
    )
}

export default PlacesPage