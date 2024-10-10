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

export interface Pricing {
  baseFarePerKm: number;
  oneTimeStartingFee: number;
  hourPrice: number;
  premiumHourPrice: number;
  waitingHourPrice: number;
  discount: number;
  discountStartKm: number;
}
