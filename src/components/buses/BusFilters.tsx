import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { FilterState } from "@/pages/BusListing";

interface BusFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const BusFilters = ({ filters, onFilterChange }: BusFiltersProps) => {
  const busTypes = ["AC Sleeper", "Non-AC Sleeper", "AC Seater", "Volvo", "Scania"];
  const operators = ["VRL Travels", "SRS Travels", "Orange Travels", "Kallada Travels", "KPN Travels"];
  const departureSlots = [
    { label: "Before 6 AM", value: "before-6" },
    { label: "6 AM - 12 PM", value: "6-12" },
    { label: "12 PM - 6 PM", value: "12-18" },
    { label: "After 6 PM", value: "after-18" },
  ];

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] as [number, number] });
  };

  const handleBusTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.busTypes, type]
      : filters.busTypes.filter((t) => t !== type);
    onFilterChange({ ...filters, busTypes: newTypes });
  };

  const handleOperatorChange = (operator: string, checked: boolean) => {
    const newOperators = checked
      ? [...filters.operators, operator]
      : filters.operators.filter((o) => o !== operator);
    onFilterChange({ ...filters, operators: newOperators });
  };

  const handleDepartureChange = (slot: string, checked: boolean) => {
    const newSlots = checked
      ? [...filters.departureTime, slot]
      : filters.departureTime.filter((s) => s !== slot);
    onFilterChange({ ...filters, departureTime: newSlots });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating: filters.rating === rating ? 0 : rating });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card rounded-xl border border-border p-5 sticky top-20"
    >
      <h3 className="font-semibold text-lg text-foreground mb-6">Filters</h3>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="font-medium text-foreground mb-4">Price Range</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={2000}
          step={100}
          className="mb-3"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Bus Types */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="font-medium text-foreground mb-4">Bus Type</h4>
        <div className="space-y-3">
          {busTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.busTypes.includes(type)}
                onCheckedChange={(checked) => handleBusTypeChange(type, checked as boolean)}
              />
              <Label
                htmlFor={`type-${type}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Departure Time */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="font-medium text-foreground mb-4">Departure Time</h4>
        <div className="space-y-3">
          {departureSlots.map((slot) => (
            <div key={slot.value} className="flex items-center space-x-2">
              <Checkbox
                id={`time-${slot.value}`}
                checked={filters.departureTime.includes(slot.value)}
                onCheckedChange={(checked) => handleDepartureChange(slot.value, checked as boolean)}
              />
              <Label
                htmlFor={`time-${slot.value}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {slot.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Operators */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="font-medium text-foreground mb-4">Operators</h4>
        <div className="space-y-3">
          {operators.map((operator) => (
            <div key={operator} className="flex items-center space-x-2">
              <Checkbox
                id={`operator-${operator}`}
                checked={filters.operators.includes(operator)}
                onCheckedChange={(checked) => handleOperatorChange(operator, checked as boolean)}
              />
              <Label
                htmlFor={`operator-${operator}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {operator}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium text-foreground mb-4">Rating</h4>
        <div className="flex flex-wrap gap-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filters.rating === rating
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {rating}
              <Star className="h-3.5 w-3.5 fill-current" />
              +
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BusFilters;
