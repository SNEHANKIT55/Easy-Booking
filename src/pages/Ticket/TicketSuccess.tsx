import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Download, Share2, Home, Ticket } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TicketData, getTicketsByBookingId } from "@/utils/ticketStorage";

const TicketSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  
  const { bookingId, contactEmail } = location.state || {};

  useEffect(() => {
    if (bookingId) {
      const bookingTickets = getTicketsByBookingId(bookingId);
      setTickets(bookingTickets);
    }
  }, [bookingId]);

  if (!bookingId) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center px-4">
            <p className="text-muted-foreground mb-4">No booking information found</p>
            <Button variant="travel" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
          >
            {/* Success Header */}
            <div className="bg-gradient-to-r from-travel-green to-travel-green/80 p-8 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="h-12 w-12" />
              </motion.div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-white/80">
                Your tickets have been booked successfully
              </p>
            </div>

            {/* Booking Details */}
            <div className="p-6 md:p-8">
              <div className="bg-muted/50 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Booking ID</span>
                  <span className="font-mono font-bold text-lg text-foreground">
                    {bookingId}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Confirmation sent to</span>
                  <span className="text-foreground font-medium">{contactEmail}</span>
                </div>
              </div>

              {/* Ticket Summary */}
              {tickets.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Ticket Summary</h3>
                  <div className="space-y-3">
                    {tickets.map((ticket, index) => (
                      <div
                        key={ticket.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
                      >
                        <div>
                          <p className="font-medium text-foreground">{ticket.passengerName}</p>
                          <p className="text-sm text-muted-foreground">
                            Seat {ticket.seatNumber} • {ticket.busType}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/ticket/${ticket.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Journey Info */}
              {tickets.length > 0 && (
                <div className="bg-primary/5 rounded-xl p-5 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">From</span>
                      <p className="font-semibold text-foreground">{tickets[0].source}</p>
                      <p className="text-muted-foreground">{tickets[0].departureTime}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground">To</span>
                      <p className="font-semibold text-foreground">{tickets[0].destination}</p>
                      <p className="text-muted-foreground">{tickets[0].arrivalTime}</p>
                    </div>
                  </div>
                  <div className="border-t border-border mt-4 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Travel Date</span>
                      <span className="font-medium text-foreground">{tickets[0].departureDate}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-muted-foreground">Operator</span>
                      <span className="font-medium text-foreground">{tickets[0].busOperator}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>

              <div className="space-y-3">
                <Button
                  variant="travel"
                  className="w-full gap-2"
                  onClick={() => navigate("/trips")}
                >
                  <Ticket className="h-4 w-4" />
                  View My Trips
                </Button>
                <Button
                  variant="ghost"
                  className="w-full gap-2"
                  onClick={() => navigate("/")}
                >
                  <Home className="h-4 w-4" />
                  Book Another Trip
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Important Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-card rounded-xl border border-border p-5"
          >
            <h3 className="font-semibold text-foreground mb-3">Important Information</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Please arrive at the boarding point 15-20 minutes before departure</li>
              <li>• Carry a valid photo ID along with your ticket</li>
              <li>• Show your ticket (printed or on mobile) to the bus staff</li>
              <li>• For any assistance, contact our 24/7 helpline: 1800-123-4567</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TicketSuccess;
