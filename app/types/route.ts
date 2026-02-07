export type CrowdLevel = "Low" | "Medium" | "High";

export interface Segment {
  mode: "bus" | "metro" | "walk";
  duration: number;
  crowd: CrowdLevel;
  accessible: boolean;
}

export interface Route {
  id: string;
  segments: Segment[];
  totalDuration: number;
  crowd: CrowdLevel;
  accessible: boolean;
  tag: string;
}
