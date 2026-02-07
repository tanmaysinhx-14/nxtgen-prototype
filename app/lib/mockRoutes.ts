import { Route } from "@/types/route";

export const routes: Route[] = [
  {
    id: "R1",
    segments: [
      { mode: "metro", duration: 20, crowd: "High", accessible: true }
    ],
    totalDuration: 25,
    crowd: "High",
    accessible: true,
    tag: "Fast but Crowded"
  },
  {
    id: "R2",
    segments: [
      { mode: "bus", duration: 30, crowd: "Medium", accessible: true }
    ],
    totalDuration: 35,
    crowd: "Medium",
    accessible: true,
    tag: "Balanced Option"
  }
];
