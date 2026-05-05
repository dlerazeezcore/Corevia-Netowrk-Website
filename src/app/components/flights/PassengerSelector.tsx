import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface PassengerSelectorProps {
  isOpen: boolean;
  adults: number;
  children: number;
  infants: number;
  onClose: () => void;
  onUpdate: (adults: number, children: number, infants: number) => void;
}

export function PassengerSelector({
  isOpen,
  adults,
  children,
  infants,
  onClose,
  onUpdate,
}: PassengerSelectorProps) {
  const [tempAdults, setTempAdults] = useState(adults);
  const [tempChildren, setTempChildren] = useState(children);
  const [tempInfants, setTempInfants] = useState(infants);

  const handleConfirm = () => {
    onUpdate(tempAdults, tempChildren, tempInfants);
    onClose();
  };

  const getTotalPassengers = () => tempAdults + tempChildren + tempInfants;

  const canConfirm = () => {
    // Must have at least one passenger
    if (getTotalPassengers() === 0) return false;
    // Infants cannot exceed adults
    if (tempInfants > tempAdults) return false;
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-x-0 bottom-0 bg-card rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold">Passengers</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {getTotalPassengers()} {getTotalPassengers() === 1 ? "passenger" : "passengers"} selected
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Passenger Types */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <PassengerRow
            label="Adults"
            description="12 years and above"
            value={tempAdults}
            onIncrement={() => setTempAdults((prev) => Math.min(prev + 1, 9))}
            onDecrement={() => setTempAdults((prev) => Math.max(prev - 1, 0))}
            min={0}
            max={9}
          />

          <PassengerRow
            label="Children"
            description="2-11 years"
            value={tempChildren}
            onIncrement={() => setTempChildren((prev) => Math.min(prev + 1, 9))}
            onDecrement={() => setTempChildren((prev) => Math.max(prev - 1, 0))}
            min={0}
            max={9}
          />

          <PassengerRow
            label="Infants"
            description="Under 2 years"
            value={tempInfants}
            onIncrement={() => setTempInfants((prev) => Math.min(prev + 1, tempAdults))}
            onDecrement={() => setTempInfants((prev) => Math.max(prev - 1, 0))}
            min={0}
            max={tempAdults}
          />

          {tempInfants > tempAdults && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3">
              <p className="text-sm text-destructive">
                Number of infants cannot exceed number of adults
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button
            onClick={handleConfirm}
            disabled={!canConfirm()}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-lg hover:shadow-xl disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none transition-all"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

function PassengerRow({
  label,
  description,
  value,
  onIncrement,
  onDecrement,
  min,
  max,
}: {
  label: string;
  description: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onDecrement}
          disabled={value <= min}
          className="w-10 h-10 rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-transparent transition-all flex items-center justify-center"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-10 text-center font-bold text-lg">{value}</div>

        <button
          onClick={onIncrement}
          disabled={value >= max}
          className="w-10 h-10 rounded-full border-2 border-primary bg-primary/5 hover:bg-primary/10 disabled:opacity-30 disabled:border-border disabled:bg-transparent transition-all flex items-center justify-center"
        >
          <Plus className="w-4 h-4 text-primary" />
        </button>
      </div>
    </div>
  );
}
