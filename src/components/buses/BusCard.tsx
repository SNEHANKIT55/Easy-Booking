import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Clock, 
  Wifi, 
  BatteryCharging, 
  Snowflake, 
  Droplets,
  ChevronDown,
  ChevronUp,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bus } from "@/types/bus";
import { cn } from "@/lib/utils";

interface BusCardProps {
  bus: Bus;
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" />,
  charging: <BatteryCharging className="h-4 w-4" />,
  blanket: <Snowflake className="h-4 w-4" />,
  water: <Droplets className="h-4 w-4" />,
};

const BusCard = ({ bus }: BusCardProps) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleViewSeats = () => {
    navigate(`/booking/${bus.id}`);
  };

  return (
    <motion.div
      layout
      className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Main Content */}
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,auto] gap-4 items-center">
          {/* Operator & Bus Info */}
          <div>
            <h3 className="font-semibold text-lg text-foreground">{bus.operator}</h3>
            <p className="text-sm text-muted-foreground">{bus.busType}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-travel-green/10 text-travel-green px-2 py-0.5 rounded">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-sm font-semibold">{bus.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({bus.totalReviews.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          {/* Timing */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{bus.departureTime}</p>
              <p className="text-xs text-muted-foreground">Departure</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-px bg-border relative">
                <Clock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-card text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground mt-1">{bus.duration}</span>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{bus.arrivalTime}</p>
              <p className="text-xs text-muted-foreground">Arrival</p>
            </div>
          </div>

          {/* Price */}
          <div className="text-right md:text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">₹{bus.price}</span>
              {bus.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{bus.originalPrice}
                </span>
              )}
            </div>
            <p className={cn(
              "text-sm font-medium",
              bus.seatsAvailable <= 5 ? "text-destructive" : "text-travel-green"
            )}>
              {bus.seatsAvailable} seats left
            </p>
          </div>

          {/* Action Button */}
          <div className="flex flex-col gap-2">
            <Button variant="travel" onClick={handleViewSeats}>
              View Seats
            </Button>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-border">
          {bus.amenities.slice(0, 4).map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-1 text-muted-foreground text-sm"
            >
              {amenityIcons[amenity] || null}
              <span className="capitalize">{amenity}</span>
            </div>
          ))}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-auto flex items-center gap-1 text-primary text-sm font-medium hover:underline"
          >
            {isExpanded ? "Hide details" : "Show details"}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-border bg-muted/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Boarding Points */}
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-travel-green" />
                    Boarding Points
                  </h4>
                  <ul className="space-y-2">
                    {bus.boardingPoints.map((point) => (
                      <li key={point} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-travel-green" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dropping Points */}
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Dropping Points
                  </h4>
                  <ul className="space-y-2">
                    {bus.droppingPoints.map((point) => (
                      <li key={point} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BusCard;
