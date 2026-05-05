import { X, Check } from "lucide-react";
import type { CabinClass } from "../../types/flights";
import { Button } from "../ui/button";

interface CabinSelectorProps {
  isOpen: boolean;
  selectedCabin: CabinClass;
  onClose: () => void;
  onSelect: (cabin: CabinClass) => void;
}

const CABIN_OPTIONS: { value: CabinClass; label: string; description: string }[] = [
  {
    value: "economy",
    label: "Economy",
    description: "Standard seating and service",
  },
  {
    value: "business",
    label: "Business",
    description: "Premium seating and enhanced service",
  },
];

export function CabinSelector({ isOpen, selectedCabin, onClose, onSelect }: CabinSelectorProps) {
  const handleSelect = (cabin: CabinClass) => {
    onSelect(cabin);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-x-0 bottom-0 bg-card rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold">Select cabin class</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Choose your travel class</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cabin Options */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {CABIN_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
                selectedCabin === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold mb-0.5">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
                {selectedCabin === option.value && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button
            onClick={onClose}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
