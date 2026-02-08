"use client";

import { createLeafletContext, LeafletProvider } from "@react-leaflet/core";
import { Map as LeafletMap } from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MapContainerProps } from "react-leaflet";
import { TileLayer, Polyline, Marker } from "react-leaflet";
import { LOCATION_COORDS } from "../lib/locationCoords";
import { Route } from "../types/route";

const routeColors = ["#198754", "#0d6efd", "#ffc107", "#dc3545"];

function SafeMapContainer({
  bounds,
  boundsOptions,
  center,
  children,
  className,
  id,
  placeholder,
  style,
  whenReady,
  zoom,
  ...options
}: MapContainerProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const [context, setContext] = useState<ReturnType<typeof createLeafletContext> | null>(null);
  const [containerProps] = useState({ className, id, style });

  const boundsRef = useRef(bounds);
  const boundsOptionsRef = useRef(boundsOptions);
  const centerRef = useRef(center);
  const zoomRef = useRef(zoom);
  const whenReadyRef = useRef(whenReady);
  const optionsRef = useRef(options);

  const mapRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (!node || mapRef.current) return;

    const map = new LeafletMap(node, optionsRef.current);
    mapRef.current = map;

    if (centerRef.current != null && zoomRef.current != null) {
      map.setView(centerRef.current, zoomRef.current);
    } else if (boundsRef.current != null) {
      map.fitBounds(boundsRef.current, boundsOptionsRef.current);
    }

    if (whenReadyRef.current) {
      map.whenReady(whenReadyRef.current);
    }

    setContext(createLeafletContext(map));
  }, []);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const contents = context ? (
    <LeafletProvider value={context}>{children}</LeafletProvider>
  ) : (
    placeholder ?? null
  );

  return (
    <div {...containerProps} ref={mapRefCallback}>
      {contents}
    </div>
  );
}

export default function RouteMap({ routes }: { routes: Route[] }) {
  if (!routes.length) return null;

  const center = LOCATION_COORDS[routes[0].from];

  return (
    <SafeMapContainer
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
    </SafeMapContainer>
  );
}
