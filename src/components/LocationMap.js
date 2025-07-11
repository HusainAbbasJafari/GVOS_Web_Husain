"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const LocationMap = ({ latitude, longitude, iconType = "" }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    const [activeMarker, setActiveMarker] = useState(null);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 46.2276, lng: 2.2137 }); // Default France center

    useEffect(() => {
        const lat = Number(latitude);
        const lng = Number(longitude);

        if (!isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng)) {
            const location = {
                id: 1,
                latitude: lat,
                longitude: lng,
            };
            setSelectedLocations([location]);
            setMapCenter({ lat: location.latitude, lng: location.longitude });
        }
    }, [latitude, longitude]);

    const mapContainerStyle = {
        width: "100%",
        height: "100%",
    };

    const center = !isNaN(mapCenter.lat) && !isNaN(mapCenter.lng) &&
        isFinite(mapCenter.lat) && isFinite(mapCenter.lng)
        ? mapCenter
        : { lat: 46.2276, lng: 2.2137 };

    return (
        <div className="relative bg-light h-full">
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={16}
                    options={{
                        fullScreenControl: true,
                        mapTypeControl: false,
                        streetViewControl: false,
                        zoomControl: false,
                        scaleControl: false,
                    }}
                >
                    {selectedLocations.map((loc, index) => {
                        const position = {
                            lat: Number(loc.latitude),
                            lng: Number(loc.longitude)
                        };

                        return (
                            <Marker
                                key={index}
                                position={position}
                                icon={{
                                    url: `/images/${iconType === "resale" ? "active_marker_resale.svg" : "active_marker.svg"}`,
                                    scaledSize: new window.google.maps.Size(40, 40),
                                }}
                            />
                        );
                    })}
                </GoogleMap>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <p>loading...</p>
                </div>
            )}
        </div>
    );
};

export default LocationMap;