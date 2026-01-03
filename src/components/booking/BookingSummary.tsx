import { Button } from "@/components/ui/button";
import { Seat } from "@/types/bus";
import { Ticket, AlertCircle } from "lucide-react";

interface BookingSummaryProps {
  selectedSeats: Seat[];
  totalAmount: number;
  onProceed: () => void;
}

const BookingSummary = ({ selectedSeats, totalAmount, onProceed }: BookingSummaryProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 sticky top-20">
      <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <Ticket className="h-5 w-5 text-primary" />
        Booking Summary
      </h2>

      {selectedSeats.length === 0 ? (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Please select at least one seat to continue
          </p>
        </div>
      ) : (
        <>
          {/* Selected Seats */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Selected Seats ({selectedSeats.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat.id}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {seat.number}
                </span>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pb-4 border-b border-border mb-4">
            {selectedSeats.map((seat) => (
              <div key={seat.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Seat {seat.number} ({seat.deck === "lower" ? "Lower" : "Upper"} Deck)
                </span>
                <span className="text-foreground">₹{seat.price}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-foreground">Total Amount</span>
            <span className="text-2xl font-bold text-primary">₹{totalAmount}</span>
          </div>

          {/* Proceed Button */}
          <Button
            variant="travel"
            size="lg"
            className="w-full"
            onClick={onProceed}
          >
            Proceed to Checkout
          </Button>

          {/* Info */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Seats will be locked for 10 minutes after proceeding
          </p>
        </>
      )}
    </div>
  );
};

export default BookingSummary;
