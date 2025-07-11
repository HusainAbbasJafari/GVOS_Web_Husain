import MapSearch from "@/components/MapSearch";
import React from "react";

const ViewProperties = async ({ params }) => {
    const { type, id } = await params;
    return (
        <MapSearch type={type} id={id} />
    );
};

export default ViewProperties;