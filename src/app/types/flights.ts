export type TripType = "one-way" | "round-trip";
export type CabinClass = "economy" | "business";

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}

export interface FlightSearchParams {
  tripType: TripType;
  origin: Airport | null;
  destination: Airport | null;
  departureDate: Date | null;
  returnDate: Date | null;
  adults: number;
  children: number;
  infants: number;
  cabin: CabinClass;
}
