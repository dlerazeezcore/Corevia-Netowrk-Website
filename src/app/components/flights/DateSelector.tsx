import { useState, useMemo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { TripType } from "../../types/flights";
import { Button } from "../ui/button";

interface DateSelectorProps {
  isOpen: boolean;
  tripType: TripType;
  selectedDeparture: Date | null;
  selectedReturn: Date | null;
  onClose: () => void;
  onSelect: (departure: Date, returnDate?: Date) => void;
}

export function DateSelector({
  isOpen,
  tripType,
  selectedDeparture,
  selectedReturn,
  onClose,
  onSelect,
}: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [tempDeparture, setTempDeparture] = useState<Date | null>(selectedDeparture);
  const [tempReturn, setTempReturn] = useState<Date | null>(selectedReturn);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysCount = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let day = 1; day <= daysCount; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    // If one-way, just set departure
    if (tripType === "one-way") {
      setTempDeparture(date);
      setTempReturn(null);
      return;
    }

    // Round-trip logic
    if (!tempDeparture || (tempDeparture && tempReturn)) {
      // Start new selection
      setTempDeparture(date);
      setTempReturn(null);
    } else if (date < tempDeparture) {
      // Selected date is before departure, swap
      setTempDeparture(date);
      setTempReturn(null);
    } else {
      // Set return date
      setTempReturn(date);
    }
  };

  const handleConfirm = () => {
    if (tempDeparture) {
      onSelect(tempDeparture, tripType === "round-trip" ? tempReturn || undefined : undefined);
    }
  };

  const isDateInRange = (date: Date) => {
    if (!tempDeparture || !tempReturn) return false;
    return date >= tempDeparture && date <= tempReturn;
  };

  const canConfirm = () => {
    if (!tempDeparture) return false;
    if (tripType === "round-trip" && !tempReturn) return false;
    return true;
  };

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-x-0 bottom-0 bg-card rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold">Select dates</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {tripType === "round-trip" ? "Choose departure and return" : "Choose departure date"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Dates Summary */}
        {(tempDeparture || tempReturn) && (
          <div className="px-6 py-4 bg-primary/5 border-b border-border">
            <div className="flex items-center gap-4">
              {tempDeparture && (
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Departure</div>
                  <div className="font-semibold">
                    {tempDeparture.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              )}
              {tripType === "round-trip" && tempReturn && (
                <>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">Return</div>
                    <div className="font-semibold">
                      {tempReturn.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Calendar */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="font-bold">{monthName}</h3>
            <button
              onClick={handleNextMonth}
              className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} />;
              }

              const isPast = date < today;
              const isToday = date.getTime() === today.getTime();
              const isDeparture = tempDeparture && date.getTime() === tempDeparture.getTime();
              const isReturn = tempReturn && date.getTime() === tempReturn.getTime();
              const inRange = isDateInRange(date);

              return (
                <button
                  key={date.getTime()}
                  onClick={() => !isPast && handleDateClick(date)}
                  disabled={isPast}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all
                    ${isPast ? "text-muted-foreground/30 cursor-not-allowed" : ""}
                    ${!isPast && !isDeparture && !isReturn && !inRange ? "hover:bg-muted/50" : ""}
                    ${isToday && !isDeparture && !isReturn ? "border border-primary" : ""}
                    ${inRange && !isDeparture && !isReturn ? "bg-primary/10" : ""}
                    ${isDeparture || isReturn ? "bg-primary text-white shadow-md" : ""}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button
            onClick={handleConfirm}
            disabled={!canConfirm()}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-lg hover:shadow-xl disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none transition-all"
          >
            Confirm Dates
          </Button>
        </div>
      </div>
    </div>
  );
}
