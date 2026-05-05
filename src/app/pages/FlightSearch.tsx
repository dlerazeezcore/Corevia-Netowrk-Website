import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeftRight,
  Calendar,
  ChevronRight,
  MapPin,
  Plane,
  Users,
  Armchair
} from "lucide-react";
import { Button } from "../components/ui/button";
import { AirportSelector } from "../components/flights/AirportSelector";
import { DateSelector } from "../components/flights/DateSelector";
import { PassengerSelector } from "../components/flights/PassengerSelector";
import { CabinSelector } from "../components/flights/CabinSelector";
import type { TripType, CabinClass, FlightSearchParams, Airport } from "../types/flights";

export function FlightSearch() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    tripType: "one-way",
    origin: null,
    destination: null,
    departureDate: null,
    returnDate: null,
    adults: 1,
    children: 0,
    infants: 0,
    cabin: "economy",
  });

  const [showAirportSelector, setShowAirportSelector] = useState(false);
  const [airportSelectorType, setAirportSelectorType] = useState<"origin" | "destination">("origin");
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [showPassengerSelector, setShowPassengerSelector] = useState(false);
  const [showCabinSelector, setShowCabinSelector] = useState(false);

  const handleSwapAirports = () => {
    setSearchParams((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const handleAirportSelect = (airport: Airport) => {
    if (airportSelectorType === "origin") {
      setSearchParams((prev) => ({ ...prev, origin: airport }));
    } else {
      setSearchParams((prev) => ({ ...prev, destination: airport }));
    }
    setShowAirportSelector(false);
  };

  const handleDateSelect = (departure: Date, returnDate?: Date) => {
    setSearchParams((prev) => ({
      ...prev,
      departureDate: departure,
      returnDate: returnDate || null,
    }));
    setShowDateSelector(false);
  };

  const handlePassengerUpdate = (adults: number, children: number, infants: number) => {
    setSearchParams((prev) => ({ ...prev, adults, children, infants }));
  };

  const handleCabinUpdate = (cabin: CabinClass) => {
    setSearchParams((prev) => ({ ...prev, cabin }));
  };

  const getCabinLabel = (cabin: CabinClass) => {
    return cabin === "economy" ? "Economy" : "Business";
  };

  const getTotalPassengers = () => {
    return searchParams.adults + searchParams.children + searchParams.infants;
  };

  const getPassengerSummary = () => {
    const parts: string[] = [];
    if (searchParams.adults > 0) parts.push(`${searchParams.adults} Adult${searchParams.adults > 1 ? "s" : ""}`);
    if (searchParams.children > 0) parts.push(`${searchParams.children} Child${searchParams.children > 1 ? "ren" : ""}`);
    if (searchParams.infants > 0) parts.push(`${searchParams.infants} Infant${searchParams.infants > 1 ? "s" : ""}`);
    return parts.join(", ");
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date);
  };

  const canSearch = () => {
    if (!searchParams.origin || !searchParams.destination) return false;
    if (!searchParams.departureDate) return false;
    if (searchParams.tripType === "round-trip" && !searchParams.returnDate) return false;
    if (searchParams.origin.code === searchParams.destination.code) return false;
    return true;
  };

  const handleSearch = () => {
    if (!canSearch()) return;

    // Navigate to results with search params
    const params = new URLSearchParams({
      tripType: searchParams.tripType,
      origin: searchParams.origin!.code,
      destination: searchParams.destination!.code,
      departureDate: searchParams.departureDate!.toISOString(),
      adults: searchParams.adults.toString(),
      children: searchParams.children.toString(),
      infants: searchParams.infants.toString(),
      cabin: searchParams.cabin,
    });

    if (searchParams.returnDate) {
      params.append("returnDate", searchParams.returnDate.toISOString());
    }

    navigate(`/flights/results?${params.toString()}`);
  };

  return (
    <div className="min-h-full bg-background pb-6">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-[#1967D2] via-[#1557B0] to-[#114A99] text-white px-6 pt-12 pb-8 overflow-hidden texture-noise">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" style={{ animationDuration: "4s" }}></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDuration: "3s", animationDelay: "0.5s" }}></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight">Book Flights</h1>
              <p className="text-sm text-white/95 font-medium">Search and compare flight offers</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search Form */}
      <div className="px-6 -mt-6 relative z-10">
        <div className="bg-card border border-border rounded-3xl shadow-2xl p-6 space-y-5">
          {/* Trip Type Toggle */}
          <div className="flex bg-muted/80 p-1 rounded-xl shadow-inner">
            <button
              onClick={() => setSearchParams((prev) => ({ ...prev, tripType: "one-way", returnDate: null }))}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                searchParams.tripType === "one-way"
                  ? "bg-white dark:bg-card text-primary shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              One Way
            </button>
            <button
              onClick={() => setSearchParams((prev) => ({ ...prev, tripType: "round-trip" }))}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                searchParams.tripType === "round-trip"
                  ? "bg-white dark:bg-card text-primary shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Round Trip
            </button>
          </div>

          {/* Origin & Destination */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Route</label>

            <div className="relative">
              {/* Origin */}
              <button
                onClick={() => {
                  setAirportSelectorType("origin");
                  setShowAirportSelector(true);
                }}
                className="w-full bg-muted/50 border border-border rounded-xl p-4 text-left hover:bg-muted transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-0.5">From</div>
                  {searchParams.origin ? (
                    <div className="font-semibold truncate">{searchParams.origin.code} - {searchParams.origin.city}</div>
                  ) : (
                    <div className="text-muted-foreground">Select origin</div>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Swap Button */}
              <button
                onClick={handleSwapAirports}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                disabled={!searchParams.origin && !searchParams.destination}
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>

              {/* Destination */}
              <button
                onClick={() => {
                  setAirportSelectorType("destination");
                  setShowAirportSelector(true);
                }}
                className="w-full bg-muted/50 border border-border rounded-xl p-4 text-left hover:bg-muted transition-all flex items-center gap-3 mt-3"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-0.5">To</div>
                  {searchParams.destination ? (
                    <div className="font-semibold truncate">{searchParams.destination.code} - {searchParams.destination.city}</div>
                  ) : (
                    <div className="text-muted-foreground">Select destination</div>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Travel Dates</label>

            <button
              onClick={() => setShowDateSelector(true)}
              className="w-full bg-muted/50 border border-border rounded-xl p-4 text-left hover:bg-muted transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-0.5">
                  {searchParams.tripType === "round-trip" ? "Departure & Return" : "Departure"}
                </div>
                <div className="font-semibold">
                  {searchParams.departureDate ? formatDate(searchParams.departureDate) : "Select date"}
                  {searchParams.tripType === "round-trip" && searchParams.returnDate && ` - ${formatDate(searchParams.returnDate)}`}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Passengers & Cabin */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Travelers & Cabin</label>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowPassengerSelector(true)}
                className="bg-muted/50 border border-border rounded-xl p-4 text-left hover:bg-muted transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <div className="text-xs text-muted-foreground">Passengers</div>
                </div>
                <div className="font-semibold text-sm">
                  {getTotalPassengers()} {getTotalPassengers() === 1 ? "Traveler" : "Travelers"}
                </div>
              </button>

              <button
                onClick={() => setShowCabinSelector(true)}
                className="bg-muted/50 border border-border rounded-xl p-4 text-left hover:bg-muted transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Armchair className="w-4 h-4 text-primary" />
                  <div className="text-xs text-muted-foreground">Cabin</div>
                </div>
                <div className="font-semibold text-sm">
                  {getCabinLabel(searchParams.cabin)}
                </div>
              </button>
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={!canSearch()}
            className="w-full h-14 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none transition-all"
          >
            Search Flights
          </Button>
        </div>
      </div>

      {/* Airport Selector Modal */}
      {showAirportSelector && (
        <AirportSelector
          isOpen={showAirportSelector}
          type={airportSelectorType}
          onClose={() => setShowAirportSelector(false)}
          onSelect={handleAirportSelect}
        />
      )}

      {/* Date Selector Modal */}
      {showDateSelector && (
        <DateSelector
          isOpen={showDateSelector}
          tripType={searchParams.tripType}
          selectedDeparture={searchParams.departureDate}
          selectedReturn={searchParams.returnDate}
          onClose={() => setShowDateSelector(false)}
          onSelect={handleDateSelect}
        />
      )}

      {/* Passenger Selector Modal */}
      {showPassengerSelector && (
        <PassengerSelector
          isOpen={showPassengerSelector}
          adults={searchParams.adults}
          children={searchParams.children}
          infants={searchParams.infants}
          onClose={() => setShowPassengerSelector(false)}
          onUpdate={handlePassengerUpdate}
        />
      )}

      {/* Cabin Selector Modal */}
      {showCabinSelector && (
        <CabinSelector
          isOpen={showCabinSelector}
          selectedCabin={searchParams.cabin}
          onClose={() => setShowCabinSelector(false)}
          onSelect={handleCabinUpdate}
        />
      )}
    </div>
  );
}
