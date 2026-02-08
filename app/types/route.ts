export type CrowdLevel = "Low" | "Medium" | "High";

export interface Segment {
  mode: "bus" | "metro" | "walk";
  duration: number;
  crowd: CrowdLevel;
  accessible: boolean;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  segments: Segment[];
  totalDuration: number;

  crowd: "Low" | "Medium" | "High";
  accessible: boolean;

  safetyScore: number;     // 1–5
  comfortScore: number;   // 1–5
  confidenceScore: number; // 0–1 (simulated usage)

  archetype: string;
}