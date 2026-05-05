import { useState, useMemo } from "react";
import { X, Search, MapPin, Clock, TrendingUp } from "lucide-react";
import type { Airport } from "../../types/flights";

interface AirportSelectorProps {
  isOpen: boolean;
  type: "origin" | "destination";
  onClose: () => void;
  onSelect: (airport: Airport) => void;
}

// Mock airport data
const AIRPORTS: Airport[] = [
  { code: "EBL", city: "Erbil", name: "Erbil International Airport", country: "Iraq" },
  { code: "DUS", city: "Düsseldorf", name: "Düsseldorf Airport", country: "Germany" },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt Airport", country: "Germany" },
  { code: "MUC", city: "Munich", name: "Munich Airport", country: "Germany" },
  { code: "BER", city: "Berlin", name: "Berlin Brandenburg Airport", country: "Germany" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport", country: "Turkey" },
  { code: "AMS", city: "Amsterdam", name: "Amsterdam Schiphol Airport", country: "Netherlands" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle Airport", country: "France" },
  { code: "LHR", city: "London", name: "Heathrow Airport", country: "United Kingdom" },
  { code: "VIE", city: "Vienna", name: "Vienna International Airport", country: "Austria" },
  { code: "ZRH", city: "Zurich", name: "Zurich Airport", country: "Switzerland" },
  { code: "BGW", city: "Baghdad", name: "Baghdad International Airport", country: "Iraq" },
  { code: "BSR", city: "Basra", name: "Basra International Airport", country: "Iraq" },
  { code: "NJF", city: "Najaf", name: "Al Najaf International Airport", country: "Iraq" },
  { code: "SDA", city: "Sulaymaniyah", name: "Sulaymaniyah International Airport", country: "Iraq" },
];

const POPULAR_AIRPORTS = ["DUS", "FRA", "IST", "AMS", "VIE"];

export function AirportSelector({ isOpen, type, onClose, onSelect }: AirportSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAirports = useMemo(() => {
    if (!searchQuery.trim()) return AIRPORTS;

    const query = searchQuery.toLowerCase();
    return AIRPORTS.filter(
      (airport) =>
        airport.code.toLowerCase().includes(query) ||
        airport.city.toLowerCase().includes(query) ||
        airport.name.toLowerCase().includes(query) ||
        airport.country.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const popularAirports = useMemo(
    () => AIRPORTS.filter((airport) => POPULAR_AIRPORTS.includes(airport.code)),
    []
  );

  const handleSelect = (airport: Airport) => {
    onSelect(airport);
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-x-0 bottom-0 bg-card rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold">
              {type === "origin" ? "Flying from" : "Flying to"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">Search for an airport</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-6 py-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="City, airport or code"
              className="w-full h-12 pl-12 pr-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Airport List */}
        <div className="flex-1 overflow-y-auto">
          {!searchQuery && popularAirports.length > 0 && (
            <div className="px-6 py-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Popular Destinations
                </h3>
              </div>
              <div className="space-y-2">
                {popularAirports.map((airport) => (
                  <AirportRow
                    key={airport.code}
                    airport={airport}
                    onClick={() => handleSelect(airport)}
                  />
                ))}
              </div>
            </div>
          )}

          {searchQuery && (
            <div className="px-6 py-4">
              {filteredAirports.length > 0 ? (
                <div className="space-y-2">
                  {filteredAirports.map((airport) => (
                    <AirportRow
                      key={airport.code}
                      airport={airport}
                      onClick={() => handleSelect(airport)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">No airports found</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px]">
                    Try searching for a different city or airport code
                  </p>
                </div>
              )}
            </div>
          )}

          {!searchQuery && (
            <div className="px-6 py-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  All Airports
                </h3>
              </div>
              <div className="space-y-2">
                {AIRPORTS.map((airport) => (
                  <AirportRow
                    key={airport.code}
                    airport={airport}
                    onClick={() => handleSelect(airport)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AirportRow({ airport, onClick }: { airport: Airport; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left"
    >
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
        <span className="text-sm font-bold text-primary">{airport.code}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate">{airport.city}</div>
        <div className="text-sm text-muted-foreground truncate">
          {airport.name} · {airport.country}
        </div>
      </div>
    </button>
  );
}
