import { Route } from "../types/route";

export const routes: Route[] = [

/* =====================================================
   RESIDENTIAL AREA → TECH PARK
===================================================== */

{
  id: "RT-R1",
  from: "Residential Area",
  to: "Tech Park",
  archetype: "Fast–Crowded",
  segments: [
    { mode: "metro", duration: 22, crowd: "High", accessible: true }
  ],
  totalDuration: 25,
  crowd: "High",
  accessible: true,
  safetyScore: 3,
  comfortScore: 3,
  confidenceScore: 0.88
},
{
  id: "RT-R2",
  from: "Residential Area",
  to: "Tech Park",
  archetype: "Balanced",
  segments: [
    { mode: "bus", duration: 25, crowd: "Medium", accessible: true },
    { mode: "metro", duration: 10, crowd: "High", accessible: true }
  ],
  totalDuration: 35,
  crowd: "Medium",
  accessible: true,
  safetyScore: 4,
  comfortScore: 4,
  confidenceScore: 0.81
},
{
  id: "RT-R3",
  from: "Residential Area",
  to: "Tech Park",
  archetype: "Least Crowded",
  segments: [
    { mode: "walk", duration: 55, crowd: "Low", accessible: false }
  ],
  totalDuration: 55,
  crowd: "Low",
  accessible: false,
  safetyScore: 4,
  comfortScore: 2,
  confidenceScore: 0.42
},
{
  id: "RT-R4",
  from: "Residential Area",
  to: "Tech Park",
  archetype: "Accessible–Safe",
  segments: [
    { mode: "bus", duration: 35, crowd: "Medium", accessible: true },
    { mode: "walk", duration: 8, crowd: "Low", accessible: true }
  ],
  totalDuration: 43,
  crowd: "Medium",
  accessible: true,
  safetyScore: 5,
  comfortScore: 4,
  confidenceScore: 0.74
},
{
  id: "RT-R5",
  from: "Residential Area",
  to: "Tech Park",
  archetype: "Comfort-Oriented",
  segments: [
    { mode: "bus", duration: 40, crowd: "Low", accessible: true }
  ],
  totalDuration: 40,
  crowd: "Low",
  accessible: true,
  safetyScore: 5,
  comfortScore: 5,
  confidenceScore: 0.67
},

/* =====================================================
   RESIDENTIAL AREA → METRO HUB
===================================================== */

{
  id: "RM-R1",
  from: "Residential Area",
  to: "Metro Hub",
  archetype: "Fast–Crowded",
  segments: [
    { mode: "metro", duration: 18, crowd: "High", accessible: true }
  ],
  totalDuration: 20,
  crowd: "High",
  accessible: true,
  safetyScore: 3,
  comfortScore: 3,
  confidenceScore: 0.86
},
{
  id: "RM-R2",
  from: "Residential Area",
  to: "Metro Hub",
  archetype: "Balanced",
  segments: [
    { mode: "bus", duration: 20, crowd: "Medium", accessible: true }
  ],
  totalDuration: 22,
  crowd: "Medium",
  accessible: true,
  safetyScore: 4,
  comfortScore: 4,
  confidenceScore: 0.79
},
{
  id: "RM-R3",
  from: "Residential Area",
  to: "Metro Hub",
  archetype: "Least Crowded",
  segments: [
    { mode: "walk", duration: 35, crowd: "Low", accessible: false }
  ],
  totalDuration: 35,
  crowd: "Low",
  accessible: false,
  safetyScore: 4,
  comfortScore: 2,
  confidenceScore: 0.45
},

/* =====================================================
   UNIVERSITY → TECH PARK
===================================================== */

{
  id: "UT-R1",
  from: "University",
  to: "Tech Park",
  archetype: "Fast–Crowded",
  segments: [
    { mode: "metro", duration: 30, crowd: "High", accessible: true }
  ],
  totalDuration: 32,
  crowd: "High",
  accessible: true,
  safetyScore: 3,
  comfortScore: 3,
  confidenceScore: 0.84
},
{
  id: "UT-R2",
  from: "University",
  to: "Tech Park",
  archetype: "Balanced",
  segments: [
    { mode: "bus", duration: 28, crowd: "Medium", accessible: true }
  ],
  totalDuration: 30,
  crowd: "Medium",
  accessible: true,
  safetyScore: 4,
  comfortScore: 4,
  confidenceScore: 0.78
},
{
  id: "UT-R3",
  from: "University",
  to: "Tech Park",
  archetype: "Accessible–Safe",
  segments: [
    { mode: "bus", duration: 35, crowd: "Low", accessible: true }
  ],
  totalDuration: 37,
  crowd: "Low",
  accessible: true,
  safetyScore: 5,
  comfortScore: 4,
  confidenceScore: 0.72
},

/* =====================================================
   UNIVERSITY → HOSPITAL
===================================================== */

{
  id: "UH-R1",
  from: "University",
  to: "Hospital",
  archetype: "Accessible–Safe",
  segments: [
    { mode: "bus", duration: 30, crowd: "Low", accessible: true }
  ],
  totalDuration: 32,
  crowd: "Low",
  accessible: true,
  safetyScore: 5,
  comfortScore: 4,
  confidenceScore: 0.83
},
{
  id: "UH-R2",
  from: "University",
  to: "Hospital",
  archetype: "Fast–Crowded",
  segments: [
    { mode: "metro", duration: 18, crowd: "High", accessible: true }
  ],
  totalDuration: 20,
  crowd: "High",
  accessible: true,
  safetyScore: 3,
  comfortScore: 3,
  confidenceScore: 0.81
},

/* =====================================================
   MARKET → RESIDENTIAL AREA
===================================================== */

{
  id: "MR-R1",
  from: "Market",
  to: "Residential Area",
  archetype: "Least Crowded",
  segments: [
    { mode: "walk", duration: 28, crowd: "Low", accessible: false }
  ],
  totalDuration: 28,
  crowd: "Low",
  accessible: false,
  safetyScore: 4,
  comfortScore: 2,
  confidenceScore: 0.51
},
{
  id: "MR-R2",
  from: "Market",
  to: "Residential Area",
  archetype: "Balanced",
  segments: [
    { mode: "bus", duration: 20, crowd: "Medium", accessible: true }
  ],
  totalDuration: 22,
  crowd: "Medium",
  accessible: true,
  safetyScore: 4,
  comfortScore: 4,
  confidenceScore: 0.69
}

];
