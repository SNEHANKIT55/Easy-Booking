import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface City {
  id: string;
  name: string;
  state: string;
}

const POPULAR_CITIES: City[] = [
  { id: "1", name: "Delhi", state: "Delhi" },
  { id: "2", name: "Mumbai", state: "Maharashtra" },
  { id: "3", name: "Bangalore", state: "Karnataka" },
  { id: "4", name: "Chennai", state: "Tamil Nadu" },
  { id: "5", name: "Hyderabad", state: "Telangana" },
  { id: "6", name: "Pune", state: "Maharashtra" },
  { id: "7", name: "Kolkata", state: "West Bengal" },
  { id: "8", name: "Jaipur", state: "Rajasthan" },
  { id: "9", name: "Ahmedabad", state: "Gujarat" },
  { id: "10", name: "Goa", state: "Goa" },
  { id: "11", name: "Lucknow", state: "Uttar Pradesh" },
  { id: "12", name: "Chandigarh", state: "Punjab" },
];

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}

const LocationInput = ({
  label,
  placeholder,
  value,
  onChange,
  icon,
  className,
}: LocationInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCities = POPULAR_CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleSelect = (city: City) => {
    onChange(city.name);
    setSearchTerm(city.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setSearchTerm("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon || <MapPin className="h-5 w-5" />}
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full h-12 pl-10 pr-10 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-2 border-b border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Search className="h-3 w-3" />
                <span>Popular Cities</span>
              </div>
            </div>
            <ul className="max-h-60 overflow-y-auto p-1">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <li key={city.id}>
                    <button
                      onClick={() => handleSelect(city)}
                      className="w-full px-3 py-2.5 text-left hover:bg-muted rounded-md transition-colors flex items-center gap-3 group"
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div>
                        <span className="font-medium text-foreground">{city.name}</span>
                        <span className="text-muted-foreground text-sm ml-1">
                          , {city.state}
                        </span>
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-3 py-4 text-center text-muted-foreground text-sm">
                  No cities found
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationInput;
