export type AircraftClass = 'ULTRA_LONG_RANGE' | 'SUPER_MIDSIZE' | 'HEAVY_JET' | 'VIP_AIRLINER';

export interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  manufacturer: string;
  category: AircraftClass;
  passengerCapacity: number;
  maxRangeNM: number; // Nautical Miles (e.g. 7700 NM)
  cruiseSpeedMach: number; // e.g. 0.90 Mach
  hourlyRateUSD: number;
  homeBaseICAO: string;
  status: 'AIRBORNE' | 'READY_AT_FBO' | 'SCHEDULED_MAINTENANCE';
  fuelBurnGPH: number; // Gallons Per Hour Jet A-1
}

export interface CharterQuoteRequest {
  id: string;
  originICAO: string;
  originName: string;
  destinationICAO: string;
  destinationName: string;
  distanceNM: number;
  flightHours: number;
  selectedAircraftId: string;
  passengerCount: number;
  departureDate: string;
  cateringTier: 'STANDARD_EXECUTIVE' | 'MICHELIN_CAVIAR_SPECIAL';
  estimatedCostUSD: number;
}

export interface EmptyLegFlight {
  id: string;
  tailNumber: string;
  aircraftModel: string;
  originICAO: string;
  originCity: string;
  destICAO: string;
  destCity: string;
  departureWindow: string;
  regularPriceUSD: number;
  emptyLegPriceUSD: number;
  discountPct: number;
  seatsAvailable: number;
}

export interface AviationContextType {
  fleet: Aircraft[];
  emptyLegs: EmptyLegFlight[];
  activeQuote: CharterQuoteRequest;
  calculateQuote: (origin: string, destination: string, aircraftId: string, passengers: number) => void;
  confirmBooking: (quote: CharterQuoteRequest) => void;
  bookedFlights: CharterQuoteRequest[];
}
