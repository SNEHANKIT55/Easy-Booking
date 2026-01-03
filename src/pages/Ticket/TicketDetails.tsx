import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Bus, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Download, 
  Share2,
  QrCode
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getTicketById, TicketData } from "@/utils/ticketStorage";

const TicketDetails = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketData | null>(null);

  useEffect(() => {
    if (ticketId) {
      const ticketData = getTicketById(ticketId);
      setTicket(ticketData || null);
    }
  }, [ticketId]);

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center px-4">
            <p className="text-muted-foreground mb-4">Ticket not found</p>
            <Button variant="travel" onClick={() => navigate("/trips")}>
              View My Trips
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

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
          >
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-primary to-travel-coral p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Bus className="h-6 w-6" />
                  <div>
                    <h2 className="font-bold text-lg">{ticket.busOperator}</h2>
                    <p className="text-white/80 text-sm">{ticket.busType}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  ticket.status === "upcoming" 
                    ? "bg-white/20 text-white" 
                    : ticket.status === "completed"
                    ? "bg-green-500/20 text-green-100"
                    : "bg-red-500/20 text-red-100"
                }`}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs">Ticket ID</p>
                  <p className="font-mono font-bold">{ticket.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs">Booking ID</p>
                  <p className="font-mono font-bold">{ticket.bookingId}</p>
                </div>
              </div>
            </div>

            {/* Journey Details */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-travel-green" />
                    <span className="text-sm text-muted-foreground">From</span>
                  </div>
                  <p className="font-semibold text-foreground text-lg">{ticket.source}</p>
                  <p className="text-sm text-muted-foreground">{ticket.boardingPoint}</p>
                </div>
                
                <div className="flex flex-col items-center px-4">
                  <div className="w-12 h-[2px] bg-border" />
                  <Bus className="h-5 w-5 text-primary my-2" />
                  <div className="w-12 h-[2px] bg-border" />
                </div>
                
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">To</span>
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground text-lg">{ticket.destination}</p>
                  <p className="text-sm text-muted-foreground">{ticket.droppingPoint}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Date</span>
                  </div>
                  <p className="font-semibold text-foreground">{ticket.departureDate}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Departure</span>
                  </div>
                  <p className="font-semibold text-foreground">{ticket.departureTime}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Arrival</span>
                  </div>
                  <p className="font-semibold text-foreground">{ticket.arrivalTime}</p>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground mb-4">Passenger Details</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium text-foreground">{ticket.passengerName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Age / Gender</p>
                    <p className="font-medium text-foreground">
                      {ticket.passengerAge} yrs / {ticket.passengerGender}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Seat Number</p>
                    <p className="font-bold text-primary text-lg">{ticket.seatNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount Paid</p>
                    <p className="font-bold text-travel-green text-lg">₹{ticket.amount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{ticket.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{ticket.contactPhone}</span>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Scan to Verify</h3>
                  <p className="text-sm text-muted-foreground">
                    Show this QR code to the bus staff
                  </p>
                </div>
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-foreground" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Ticket
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Booking Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-card rounded-xl border border-border p-5"
          >
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Booked on</span>
              <span className="text-foreground">{new Date(ticket.bookingDate).toLocaleDateString()}</span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TicketDetails;
