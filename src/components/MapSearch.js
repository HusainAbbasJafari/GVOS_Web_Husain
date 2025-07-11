'use client';

import { Circle, GoogleMap, InfoWindowF, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import PropertyCardMap from './PropertyCardMap';
import { clusterStyles, mapOptions } from '@/utility/data';

const containerStyle = {
    width: '100%',
    height: '524px',
};

export default function MapSearch({ mapFilterType, mapProperties, featureCollection, mapCenter, setCircleData, circleData, setDeptSelected, deptSelected }) {

    let mapZoom = mapFilterType === 'map' ? 7 : mapFilterType === 'radius' ? 8 : 7;

    const mapRef = useRef(null);
    const circleRef = useRef(null);
    const circleClickRef = useRef(false);

    const [selectedProperty, setSelectedProperty] = useState(null);

    const [geoFeatures, setGeoFeatures] = useState([]);
    const [markerPositions, setMarkerPositions] = useState([]);
    const [markerDetails, setMarkerDetails] = useState([]);

    // update plygon colors when deptSelected changes
    useEffect(() => {
        if (!mapRef.current || !deptSelected) return;

        const selectedIds = deptSelected.map((item) => item.id);
        updateStyles(mapRef.current, selectedIds);
    }, [deptSelected]);

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.data.forEach((feature) => map.data.remove(feature));

            // console.log(featureCollection, "featureCollection")
            if (!map || mapFilterType !== 'map') return;

            if (featureCollection && featureCollection.features && featureCollection.features.length > 0) {

                map.data.addGeoJson(featureCollection);

                const features = [];
                const markers = [];
                const details = [];

                map.data.forEach((feature, index) => {
                    features.push(feature);

                    const bounds = new window.google.maps.LatLngBounds();
                    feature.getGeometry().forEachLatLng((latLng) => {
                        bounds.extend(latLng);
                    });

                    const center = bounds.getCenter().toJSON();
                    markers.push(center);
                    details.push({
                        id: feature.getProperty('id'),
                        name: feature.getProperty('nom'),
                        position: center,
                    });
                });

                mapZoom = 8; //zoom map

                setGeoFeatures(features);
                setMarkerPositions(markers);
                setMarkerDetails(details);

                updateStyles(map, deptSelected);

                map.data.addListener('click', (event) => {
                    if (circleClickRef.current) {
                        circleClickRef.current = false;
                        return;
                    }

                    const id = event.feature.getProperty('id');
                    const name = event.feature.getProperty('nom');

                    setDeptSelected((prev) => {
                        const already = prev.some((item) => item.id === id);
                        const updated = already
                            ? prev.filter((item) => item.id !== id)
                            : [...prev, { id, name }];

                        // console.log("Selected departments:", updated);
                        // updateStyles(map, updated.map((item) => item.id)); // pass only IDs to updateStyles
                        return updated;
                    });
                });

                map.data.addListener('mouseover', (event) => {
                    map.data.overrideStyle(event.feature, {
                        strokeColor: '#ee2854',
                        fillColor: '#ee2854',
                        fillOpacity: 0.2,
                    });
                });

                map.data.addListener('mouseout', (event) => {
                    map.data.revertStyle(event.feature);
                });
            }
        }
    }, [featureCollection]);

    const updateStyles = (map, selectedIds) => {
        // console.log(selectedIds, deptSelected, "aadi test 3")
        map.data.setStyle((feature) => {
            const id = feature.getProperty('id');
            const isSelected = selectedIds.includes(id);
            return {
                fillColor: isSelected ? '#ee2854' : '#666666',
                fillOpacity: isSelected ? 0.4 : 0.2,
                strokeColor: isSelected ? '#ee2854' : '#666666',
                strokeWeight: isSelected ? 2 : 1,
                strokeOpacity: 0.8,
            };
        });
    };

    const handleCircleChange = () => {
        const map = mapRef.current;
        const circle = circleRef.current;
        if (!map || !circle) return;

        const radius = circle.getRadius();
        const center = circle.getCenter();
        const lat = center.lat();
        const lng = center.lng();

        setCircleData({ lat, lng, radius });

        // console.log(`Circle updated - Radius: ${radius} meters, Center: (${lat}, ${lng})`);
    };

    const handleMapLoad = (map) => {
        mapRef.current = map;
    };

    const clusterOptions = {
        styles: clusterStyles,
    };
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={mapZoom}
            onLoad={handleMapLoad}
            options={mapOptions}
        >
            {mapProperties && mapProperties.length > 0 && (
                <>
                    <MarkerClusterer options={clusterOptions}>
                        {(clusterer) =>
                            mapProperties.map((property, index) => {
                                const lat = Number(property.latitude);
                                const lng = Number(property.longitude);

                                if (isNaN(lat) || isNaN(lng)) {
                                    console.warn('Invalid lat/lng:', property.latitude, property.longitude);
                                    return null;
                                }

                                return (
                                    <Marker
                                        key={index}
                                        position={{ lat: lat, lng: lng }}
                                        clusterer={clusterer}
                                        icon={{
                                            url: `/images/${property.type === 'new home' ? 'active_marker.svg' : 'active_marker_resale.svg'}`,
                                            scaledSize: new window.google.maps.Size(40, 40),
                                        }}
                                        onClick={() => setSelectedProperty(property)}
                                    />
                                );
                            })
                        }
                    </MarkerClusterer>

                    {mapFilterType === 'radius' && (
                        <Circle
                            center={mapCenter}
                            radius={50000}
                            options={{
                                strokeColor: '#989898',
                                strokeOpacity: 1,
                                strokeWeight: 2,
                                fillColor: '#f1f100',
                                fillOpacity: 0.2,
                                editable: true,
                                draggable: true,
                            }}
                            onRadiusChanged={handleCircleChange}
                            onCenterChanged={handleCircleChange}
                            onMouseDown={() => {
                                circleClickRef.current = true;
                            }}
                            onLoad={(circle) => {
                                circleRef.current = circle;
                            }}
                        />
                    )}

                    {selectedProperty && (
                        <InfoWindowF
                            position={{ lat: selectedProperty.latitude, lng: selectedProperty.longitude }}
                            options={{
                                pixelOffset: new window.google.maps.Size(0, -40),
                            }}
                            onCloseClick={() => setSelectedProperty(null)}
                            className="custom-info-window"
                        >
                            <PropertyCardMap
                                item={selectedProperty}
                            />
                        </InfoWindowF>
                    )}
                </>
            )}
        </GoogleMap>
    );
}