"use client";

import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { LOCATION_COORDS } from "../lib/locationCoords";
import type { Route } from "../types/route";

const routeColors = ["#198754", "#0d6efd", "#ffc107", "#dc3545"];
const containerStyle = { height: "400px", width: "100%" };
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

type LatLng = google.maps.LatLngLiteral;

const toLatLng = (coords: { lat: number; lng: number }): LatLng => ({
  lat: coords.lat,
  lng: coords.lng
});

const buildPath = (route: Route, idx: number): LatLng[] => {
  const start = LOCATION_COORDS[route.from];
  const end = LOCATION_COORDS[route.to];
  const midpoint = {
    lat: (start.lat + end.lat) / 2 + 0.003 * (idx + 1),
    lng: (start.lng + end.lng) / 2 + 0.003 * (idx + 1)
  };

  return [toLatLng(start), midpoint, toLatLng(end)];
};

function RouteMapWithKey({ routes, apiKey }: { routes: Route[]; apiKey: string }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "nxtgen-google-maps",
    googleMapsApiKey: apiKey
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const start = LOCATION_COORDS[routes[0].from];
  const end = LOCATION_COORDS[routes[0].to];
  const startPosition = useMemo(() => toLatLng(start), [start]);
  const endPosition = useMemo(() => toLatLng(end), [end]);
  const center = startPosition;

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(startPosition);
    bounds.extend(endPosition);
    mapRef.current.fitBounds(bounds);
  }, [endPosition, isLoaded, startPosition]);

  if (loadError) {
    return (
      <div className="alert alert-danger mb-0">
        Google Maps failed to load. Check the API key and enabled APIs.
      </div>
    );
  }

  if (!isLoaded) {
    return <p className="text-muted mb-0">Loading map...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      }}
    >
      <Marker position={startPosition} label="A" />
      <Marker position={endPosition} label="B" />

      {routes.map((route, idx) => (
        <Polyline
          key={route.id}
          path={buildPath(route, idx)}
          options={{
            strokeColor: routeColors[idx % routeColors.length],
            strokeOpacity: idx === 0 ? 1 : 0.65,
            strokeWeight: idx === 0 ? 5 : 3
          }}
        />
      ))}
    </GoogleMap>
  );
}

export default function RouteMap({ routes }: { routes: Route[] }) {
  if (!routes.length) return null;

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="alert alert-warning mb-0">
        Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local to load the map.
      </div>
    );
  }

  return <RouteMapWithKey routes={routes} apiKey={GOOGLE_MAPS_API_KEY} />;
}
