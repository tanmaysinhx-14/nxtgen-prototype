"use client";

import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import { LOCATION_COORDS } from "../lib/locationCoords";
import { Route } from "../types/route";

const routeColors = ["#198754", "#0d6efd", "#ffc107", "#dc3545"];

export default function RouteMap({ routes }: { routes: Route[] }) {
  if (!routes.length) return null;

  const center = LOCATION_COORDS[routes[0].from];

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        {...({ attribution: "© OpenStreetMap contributors" } as any)}
      />


      {/* Markers */}
      <Marker position={[center.lat, center.lng]} />
      <Marker
        position={[
          LOCATION_COORDS[routes[0].to].lat,
          LOCATION_COORDS[routes[0].to].lng
        ]}
      />

      {/* Polylines */}
      {routes.map((route, idx) => {
        const start = LOCATION_COORDS[route.from];
        const end = LOCATION_COORDS[route.to];

        const path = [
          [start.lat, start.lng],
          [
            start.lat + 0.003 * (idx + 1),
            start.lng + 0.003 * (idx + 1)
          ],
          [end.lat, end.lng]
        ];

        return (
          <Polyline
            key={route.id}
            positions={path}
            pathOptions={{
              color: routeColors[idx % routeColors.length],
              weight: idx === 0 ? 5 : 3,
              opacity: idx === 0 ? 1 : 0.6
            }}
          />
        );
      })}
    </MapContainer>
  );
}
