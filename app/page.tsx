"use client";

import { useState } from "react";
import { Route } from "./types/route";

export default function Home() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [accessibility, setAccessibility] = useState(false);

  const fetchRoutes = async () => {
    const res = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ accessibility })
    });
    setRoutes(await res.json());
  };

  return (
    <div className="container mt-4">
      <h3>Crowd-Aware Mobility Prototype</h3>

      <div className="form-check form-switch my-3">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={e => setAccessibility(e.target.checked)}
        />
        <label className="form-check-label">
          Accessibility Required
        </label>
      </div>

      <button className="btn btn-primary" onClick={fetchRoutes}>
        Find Routes
      </button>

      {routes.map(r => (
        <div className="card mt-3" key={r.id}>
          <div className="card-body">
            <h5>Route {r.id}</h5>
            <p>Crowd: {r.crowd}</p>
            <p>Duration: {r.totalDuration} mins</p>
            <span className="badge bg-secondary">{r.tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
