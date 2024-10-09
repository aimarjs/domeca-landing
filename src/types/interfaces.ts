// src/types/index.ts
export interface Location {
  name: string;
  latitude: number | null;
  longitude: number | null;
}

export interface Step {
  mode: string;
  maneuver: {
    type: string;
  };
}

export interface Leg {
  steps: Step[];
}

export interface RouteData {
  distanceInKm: number;
  durationInMinutes: number;
  legs: Leg[];
}
