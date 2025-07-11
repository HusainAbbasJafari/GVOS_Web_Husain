// /app/api/place-details/route.js

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get('placeId');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,name&key=${apiKey}`
    );

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
