export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const input = searchParams.get('input');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            input
        )}&location=${lat},${lng}&radius=50000&key=${apiKey}`
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}