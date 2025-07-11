import { centroid, multiPolygon } from '@turf/turf';

export function getPathFromCoordinates(coordinates) {
    return coordinates.map((entry) =>
        entry.reduce((list, polygon) => {
            polygon.map((point) => {
                list.push({ lat: point[1], lng: point[0] });
            });
            return list;
        }, [])
    );
}


export function getMultiPolygonCenter(coordinates) {
    const center = centroid(multiPolygon(coordinates));
    return {
        lat: center.geometry.coordinates[1],
        lng: center.geometry.coordinates[0],
    };
}