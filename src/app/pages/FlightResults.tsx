import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Plane, Clock, MapPin, TrendingUp, Zap, DollarSign } from "lucide-react";
import type { Airport } from "../types/flights";

export interface FlightOffer {
  id: string;
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  arrivalDateTime: string;
  duration: string;
  stops: number;
  currency: string;
  basePrice: number;
  hasFareFamilies: boolean;
  fareFamilies?: FareFamily[];
  badges?: ("best-value" | "fastest" | "lowest")[];
}

export interface FareFamily {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  restrictions: string[];
  isRecommended?: boolean;
}

// Mock flight data
const MOCK_FLIGHTS: FlightOffer[] = [
  {
    id: "EW-123",
    airlineCode: "EW",
    airlineName: "Eurowings",
    flightNumber: "EW 123",
    origin: "EBL",
    destination: "DUS",
    departureDateTime: "2026-06-01T10:30:00",
    arrivalDateTime: "2026-06-01T15:45:00",
    duration: "5h 15m",
    stops: 0,
    currency: "EUR",
    basePrice: 189,
    hasFareFamilies: true,
    badges: ["best-value"],
    fareFamilies: [
      {
        id: "basic",
        name: "Basic",
        price: 189,
        benefits: ["1 personal item"],
        restrictions: ["No seat selection", "No changes", "No refunds"],
      },
      {
        id: "smart",
        name: "Smart",
        price: 249,
        benefits: [
          "1 personal item",
          "1 carry-on bag (8kg)",
          "Seat selection",
          "Priority boarding",
        ],
        restrictions: ["Changes allowed (fee applies)", "No refunds"],
        isRecommended: true,
      },
      {
        id: "biz",
        name: "BIZclass",
        price: 449,
        benefits: [
          "1 personal item",
          "1 carry-on bag (8kg)",
          "1 checked bag (23kg)",
          "Premium seat selection",
          "Priority boarding",
          "Priority check-in",
          "Lounge access",
          "Free changes",
        ],
        restrictions: [],
      },
    ],
  },
  {
    id: "TK-456",
    airlineCode: "TK",
    airlineName: "Turkish Airlines",
    flightNumber: "TK 456",
    origin: "EBL",
    destination: "DUS",
    departureDateTime: "2026-06-01T08:15:00",
    arrivalDateTime: "2026-06-01T17:30:00",
    duration: "9h 15m",
    stops: 1,
    currency: "EUR",
    basePrice: 299,
    hasFareFamilies: false,
    badges: [],
  },
  {
    id: "LH-789",
    airlineCode: "LH",
    airlineName: "Lufthansa",
    flightNumber: "LH 789",
    origin: "EBL",
    destination: "DUS",
    departureDateTime: "2026-06-01T14:20:00",
    arrivalDateTime: "2026-06-01T19:05:00",
    duration: "4h 45m",
    stops: 0,
    currency: "EUR",
    basePrice: 159,
    hasFareFamilies: false,
    badges: ["fastest", "lowest"],
  },
];

export function FlightResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);

  const searchCriteria = useMemo(() => {
    return {
      tripType: searchParams.get("tripType") || "one-way",
      origin: searchParams.get("origin") || "",
      destination: searchParams.get("destination") || "",
      departureDate: searchParams.get("departureDate") || "",
      returnDate: searchParams.get("returnDate"),
      adults: parseInt(searchParams.get("adults") || "1"),
      children: parseInt(searchParams.get("children") || "0"),
      infants: parseInt(searchParams.get("infants") || "0"),
    };
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleFlightSelect = (flight: FlightOffer) => {
    if (flight.hasFareFamilies) {
      // Show fare family selection
      setSelectedFlight(flight);
    } else {
      // Continue directly to booking
      // For now, just show an alert
      alert(`Selected ${flight.airlineName} ${flight.flightNumber} for €${flight.basePrice}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getBadgeConfig = (badge: string) => {
    switch (badge) {
      case "best-value":
        return {
          label: "Best",
          icon: TrendingUp,
          className: "bg-primary/10 text-primary border-primary/30",
        };
      case "fastest":
        return {
          label: "Fastest",
          icon: Zap,
          className: "bg-orange-50 text-orange-700 border-orange-200",
        };
      case "lowest":
        return {
          label: "Lowest",
          icon: DollarSign,
          className: "bg-green-50 text-green-700 border-green-200",
        };
      default:
        return null;
    }
  };

  const totalPassengers = searchCriteria.adults + searchCriteria.children + searchCriteria.infants;

  return (
    <div className="min-h-full bg-background pb-6">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-[#1967D2] via-[#1557B0] to-[#114A99] text-white px-6 pt-12 pb-6 overflow-hidden texture-noise">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" style={{ animationDuration: "4s" }}></div>

        <div className="relative z-10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 mb-4 -ml-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to search</span>
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl font-bold">
              {searchCriteria.origin} → {searchCriteria.destination}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/95">
            <div>{formatDate(searchCriteria.departureDate)}</div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div>
              {totalPassengers} {totalPassengers === 1 ? "passenger" : "passengers"}
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="capitalize">{searchCriteria.tripType.replace("-", " ")}</div>
          </div>
        </div>
      </header>

      {/* Results List */}
      <div className="px-6 mt-6 space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-muted-foreground">{MOCK_FLIGHTS.length} flights available</h2>
        </div>

        {MOCK_FLIGHTS.map((flight) => (
          <button
            key={flight.id}
            onClick={() => handleFlightSelect(flight)}
            className="w-full bg-card border-2 border-border rounded-xl p-5 hover:shadow-xl hover:border-primary/40 transition-all text-left"
          >
            {/* Airline & Badges */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-bold text-base">{flight.airlineName}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{flight.flightNumber}</div>
              </div>

              {flight.badges && flight.badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {flight.badges.map((badge) => {
                    const config = getBadgeConfig(badge);
                    if (!config) return null;
                    const Icon = config.icon;
                    return (
                      <div
                        key={badge}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${config.className}`}
                      >
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Flight Times & Route */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="text-xl font-bold mb-0.5">{formatTime(flight.departureDateTime)}</div>
                <div className="text-sm text-muted-foreground">{flight.origin}</div>
              </div>

              <div className="flex flex-col items-center px-2">
                <div className="text-xs text-muted-foreground mb-1.5">{flight.duration}</div>
                <div className="w-16 h-0.5 bg-border relative">
                  <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90" />
                </div>
                <div className="text-xs text-muted-foreground mt-1.5 font-medium">
                  {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                </div>
              </div>

              <div className="flex-1 text-right">
                <div className="text-xl font-bold mb-0.5">{formatTime(flight.arrivalDateTime)}</div>
                <div className="text-sm text-muted-foreground">{flight.destination}</div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                {flight.hasFareFamilies ? "Starting from" : "Total price"}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-primary">
                  €{flight.basePrice}
                </span>
                <span className="text-xs text-muted-foreground">
                  / {totalPassengers > 1 ? `${totalPassengers} pax` : "person"}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Fare Family Selection Modal */}
      {selectedFlight && selectedFlight.hasFareFamilies && (
        <FareFamilySelector
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
          onSelect={(fareFamily) => {
            alert(`Selected ${selectedFlight.airlineName} ${fareFamily.name} for €${fareFamily.price}`);
            setSelectedFlight(null);
          }}
        />
      )}
    </div>
  );
}

interface FareFamilySelectorProps {
  flight: FlightOffer;
  onClose: () => void;
  onSelect: (fareFamily: FareFamily) => void;
}

function FareFamilySelector({ flight, onClose, onSelect }: FareFamilySelectorProps) {
  const [selectedFare, setSelectedFare] = useState<FareFamily | null>(
    flight.fareFamilies?.find((f) => f.isRecommended) || null
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full flex items-end">
          <div className="w-full bg-card rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">Choose your fare</h2>
                <p className="text-sm text-muted-foreground">
                  {flight.airlineName} {flight.flightNumber}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Fare Cards */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {flight.fareFamilies?.map((fare) => (
                <button
                  key={fare.id}
                  onClick={() => setSelectedFare(fare)}
                  className={`w-full border-2 rounded-xl p-5 text-left transition-all ${
                    selectedFare?.id === fare.id
                      ? "border-primary bg-primary/5 shadow-xl"
                      : "border-border bg-card hover:border-primary/30 hover:shadow-md"
                  }`}
                >
                  {/* Fare Name & Price */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{fare.name}</h3>
                        {fare.isRecommended && (
                          <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wide rounded-md">
                            Recommended
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">€{fare.price}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">per person</div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 mb-4">
                    {fare.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                        <span className="text-foreground leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Restrictions */}
                  {fare.restrictions.length > 0 && (
                    <div className="pt-3 border-t border-border space-y-2">
                      {fare.restrictions.map((restriction, index) => (
                        <div key={index} className="flex items-start gap-2.5 text-sm">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 shrink-0"></div>
                          <span className="text-muted-foreground leading-relaxed">{restriction}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <button
                onClick={() => selectedFare && onSelect(selectedFare)}
                disabled={!selectedFare}
                className="w-full h-14 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none transition-all"
              >
                Continue with {selectedFare?.name || "selected fare"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
