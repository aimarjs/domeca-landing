import { Control, FieldErrors } from "react-hook-form";

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
  clientDistance: number;
  distanceInKm: number;
  clientDurationInMinutes: number;
  durationInMinutes: number;
  taxRate: number;
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
  taxRate: number;
}

export interface ContactFormProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export interface FormData {
  startDateTime: string;
  endDateTime: string;
  isPremium: boolean;
  name: string;
  email: string;
  phoneNumber: string;
  passengers: number;
}

export interface hqCoords {
  latitude: number;
  longitude: number;
}

export interface TripBookingFormProps {
  hqCoords: hqCoords;
}

export interface Pricing {
  id: number;
  baseFarePerKm: number;
  oneTimeStartingFee: number;
  hourPrice: number;
  waitingHourPrice: number;
  discount: number;
  discountStartKm: number;
  premiumHourPrice: number;
  taxRate: number;
}

export interface PricingRequestBody {
  baseFarePerKm: number;
  oneTimeStartingFee: number;
  hourPrice: number;
  waitingHourPrice: number;
  discount: number;
  discountStartKm: number;
  premiumHourPrice: number;
  taxRate: number;
}

export interface PricingNoDataResponse {
  message: string;
}

export interface PricingErrorResponse {
  message: string;
  error?: string;
}
