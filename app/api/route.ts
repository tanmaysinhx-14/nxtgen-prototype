import { NextResponse } from "next/server";
import { routes } from "../lib/mockRoutes";
import { Route } from "../types/route";

interface Preferences {
  accessibility: boolean;
}

function computeScore(route: Route, prefs: Preferences) {
  let score = 0;

  if (prefs.accessibility && route.accessible) score += 10;
  if (!prefs.accessibility && route.crowd === "Low") score += 5;

  score += route.safetyScore * 2;
  score += route.comfortScore * 2;
  score += route.confidenceScore * 5;

  if (route.crowd === "High") score -= 3;

  return score;
}

export async function POST(req: Request) {
  const { source, destination, accessibility } = await req.json();

  let result = routes.filter(
    r => r.from === source && r.to === destination
  );

  const ranked = result
    .map(route => ({
      ...route,
      score: computeScore(route, { accessibility })
    }))
    .sort((a, b) => b.score - a.score);

  return NextResponse.json(ranked);
}
