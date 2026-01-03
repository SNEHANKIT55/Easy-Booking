import { motion } from "framer-motion";
import { Seat } from "@/types/bus";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface SeatLayoutProps {
  seats: Seat[];
  onSeatClick: (seatId: string) => void;
}

const SeatLayout = ({ seats, onSeatClick }: SeatLayoutProps) => {
  const lowerDeck = seats.filter((s) => s.deck === "lower");
  const upperDeck = seats.filter((s) => s.deck === "upper");

  const getSeatColor = (status: Seat["status"]) => {
    switch (status) {
      case "available":
        return "bg-muted border-border hover:border-primary cursor-pointer";
      case "selected":
        return "bg-primary border-primary cursor-pointer";
      case "booked":
        return "bg-muted-foreground/20 border-muted-foreground/20 cursor-not-allowed";
      case "ladies":
        return "bg-pink-100 border-pink-300 hover:border-pink-500 cursor-pointer dark:bg-pink-900/30 dark:border-pink-700";
      default:
        return "";
    }
  };

  const renderDeck = (deckSeats: Seat[], deckName: string) => {
    const rows: Seat[][] = [];
    for (let i = 0; i < deckSeats.length; i += 2) {
      rows.push(deckSeats.slice(i, i + 2));
    }

    return (
      <div className="flex-1">
        <h4 className="text-sm font-medium text-muted-foreground mb-4 text-center">
          {deckName}
        </h4>
        <div className="bg-muted/50 rounded-xl p-4 relative">
          {/* Steering wheel indicator */}
          <div className="absolute -top-2 left-4 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-secondary-foreground/50 rounded-full" />
          </div>

          <div className="mt-4 space-y-2">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-between gap-8">
                {/* Left seat */}
                <motion.button
                  whileHover={{ scale: row[0]?.status !== "booked" ? 1.05 : 1 }}
                  whileTap={{ scale: row[0]?.status !== "booked" ? 0.95 : 1 }}
                  onClick={() => row[0]?.status !== "booked" && onSeatClick(row[0].id)}
                  disabled={row[0]?.status === "booked"}
                  className={cn(
                    "w-20 h-12 rounded-lg border-2 flex items-center justify-center font-medium text-sm transition-all",
                    getSeatColor(row[0]?.status || "available"),
                    row[0]?.status === "selected" && "text-primary-foreground"
                  )}
                >
                  {row[0]?.status === "booked" ? (
                    <User className="h-5 w-5 text-muted-foreground/50" />
                  ) : (
                    row[0]?.number
                  )}
                </motion.button>

                {/* Right seat */}
                {row[1] && (
                  <motion.button
                    whileHover={{ scale: row[1].status !== "booked" ? 1.05 : 1 }}
                    whileTap={{ scale: row[1].status !== "booked" ? 0.95 : 1 }}
                    onClick={() => row[1].status !== "booked" && onSeatClick(row[1].id)}
                    disabled={row[1].status === "booked"}
                    className={cn(
                      "w-20 h-12 rounded-lg border-2 flex items-center justify-center font-medium text-sm transition-all",
                      getSeatColor(row[1].status),
                      row[1].status === "selected" && "text-primary-foreground"
                    )}
                  >
                    {row[1].status === "booked" ? (
                      <User className="h-5 w-5 text-muted-foreground/50" />
                    ) : (
                      row[1].number
                    )}
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-muted border-2 border-border" />
          <span className="text-sm text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary border-2 border-primary" />
          <span className="text-sm text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-muted-foreground/20 border-2 border-muted-foreground/20" />
          <span className="text-sm text-muted-foreground">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-pink-100 border-2 border-pink-300 dark:bg-pink-900/30 dark:border-pink-700" />
          <span className="text-sm text-muted-foreground">Ladies</span>
        </div>
      </div>

      {/* Decks */}
      <div className="flex flex-col md:flex-row gap-8">
        {renderDeck(lowerDeck, "Lower Deck")}
        {renderDeck(upperDeck, "Upper Deck")}
      </div>
    </div>
  );
};

export default SeatLayout;
