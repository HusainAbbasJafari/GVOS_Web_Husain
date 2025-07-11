'use client'; // ✅ Important for Google Maps + Next.js App Router!

import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div className='text-lg font-medium text-center mt-10'>Loading Maps...</div>;

  return <>{children}</>;
};
