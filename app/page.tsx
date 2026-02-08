"use client";

import { useState } from "react";
import { Route } from "./types/route";

import dynamic from "next/dynamic";

const RouteMap = dynamic(
  () => import("./components/routeMap"),
  { ssr: false }
);

const crowdUI = {
  Low: { value: 30, color: "success", text: "Low crowd" },
  Medium: { value: 60, color: "warning", text: "Moderate crowd" },
  High: { value: 90, color: "danger", text: "Heavy crowd" }
};

const LOCATIONS = [
  "Residential Area",
  "Tech Park",
  "Metro Hub",
  "Market",
  "University",
  "Hospital"
];


function explainRoute(route: Route) {
  if (route.crowd === "Low") return "Least crowded route";
  if (route.crowd === "Medium") return "Balanced comfort and crowd";
  return "Fast but crowded route";
}

function buildPolyline(route, coords) {
  return [
    coords[route.from],
    ...route.segments.map(() => ({
      lat:
        coords[route.from].lat +
        Math.random() * 0.01 -
        0.005,
      lng:
        coords[route.from].lng +
        Math.random() * 0.01 -
        0.005
    })),
    coords[route.to]
  ];
}


export default function Home() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [accessibility, setAccessibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const fetchRoutes = async () => {
    setLoading(true);
    const res = await fetch("/api", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ accessibility })
    });
    setRoutes(await res.json());
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h3>Crowd-Aware Urban Mobility Prototype</h3>

      <select
        className="form-select mb-2"
        value={source}
        onChange={e => setSource(e.target.value)}
      >
        <option value="">Select Source</option>
        {LOCATIONS.map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <select
        className="form-select mb-3"
        value={destination}
        onChange={e => setDestination(e.target.value)}
      >
        <option value="">Select Destination</option>
        {LOCATIONS.map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <div className="form-check form-switch my-3">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={e => setAccessibility(e.target.checked)}
        />
        <label className="form-check-label">
          Accessibility required
        </label>
      </div>

      <button className="btn btn-primary" onClick={fetchRoutes}>
        Find Routes
      </button>

      {loading && <p className="mt-3">Loading routes…</p>}

      {routes.length > 0 && (
        <div className="mt-4">
          <h5>Route Visualization</h5>
          <RouteMap routes={routes} />
        </div>
      )}


      {routes.length > 0 && (
        <p className="text-muted mt-3">
          Showing routes optimized for
          <strong>
            {accessibility ? " accessibility" : " general travel"}
          </strong>
        </p>
      )}

      {routes.map((r, i) => (
        <div
          key={r.id}
          className={`card mt-3 ${
            i === 0 ? "border-success shadow" : ""
          }`}
        >
          <div className="card-body">
            {i === 0 && (
              <span className="badge bg-success mb-2">
                Recommended
              </span>
            )}

            <h5>Route {r.id}</h5>

            {/* Transport modes */}
            <div className="mb-2">
              {r.segments.map((s, idx) => (
                <span
                  key={idx}
                  className="badge bg-light text-dark me-1"
                >
                  {s.mode.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Crowd indicator */}
            <div className="mb-2">
              <small>{crowdUI[r.crowd].text}</small>
              <div className="progress">
                <div
                  className={`progress-bar bg-${crowdUI[r.crowd].color}`}
                  style={{ width: `${crowdUI[r.crowd].value}%` }}
                />
              </div>
            </div>

            <p className="mb-1">
              Duration: {r.totalDuration} mins
            </p>

            <p className="text-muted">
              {explainRoute(r)}
            </p>

            <span className="badge bg-secondary">{r.archetype}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
