import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationInput from "./LocationInput";
import DatePicker from "./DatePicker";
import { toast } from "@/hooks/use-toast";

const SearchForm = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    if (!from) {
      toast({
        title: "Select departure city",
        description: "Please select where you're traveling from",
        variant: "destructive",
      });
      return;
    }
    if (!to) {
      toast({
        title: "Select destination city",
        description: "Please select where you're traveling to",
        variant: "destructive",
      });
      return;
    }
    if (!date) {
      toast({
        title: "Select travel date",
        description: "Please select your travel date",
        variant: "destructive",
      });
      return;
    }
    if (from === to) {
      toast({
        title: "Invalid route",
        description: "Departure and destination cities cannot be the same",
        variant: "destructive",
      });
      return;
    }

    navigate(`/buses?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date.toISOString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-card/95 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-border/50"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr,1fr,auto] gap-4 items-end">
        {/* From */}
        <LocationInput
          label="From"
          placeholder="Enter departure city"
          value={from}
          onChange={setFrom}
        />

        {/* Swap Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleSwap}
          className="h-12 w-12 rounded-full border-2 border-primary/20 hover:border-primary hover:bg-primary/10 self-end mb-[2px]"
        >
          <ArrowRightLeft className="h-4 w-4 text-primary" />
        </Button>

        {/* To */}
        <LocationInput
          label="To"
          placeholder="Enter destination city"
          value={to}
          onChange={setTo}
        />

        {/* Date */}
        <DatePicker
          label="Travel Date"
          date={date}
          onDateChange={setDate}
        />

        {/* Search Button */}
        <Button
          variant="travel"
          size="lg"
          onClick={handleSearch}
          className="h-12 px-8 self-end"
        >
          <Search className="h-5 w-5 mr-2" />
          Search Buses
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchForm;
