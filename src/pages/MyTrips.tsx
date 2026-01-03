import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket, Calendar, Clock, MapPin, ArrowRight, Bus as BusIcon } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserTickets, getUpcomingTickets, getPastTickets, TicketData } from "@/utils/ticketStorage";
import { getCurrentUser } from "@/utils/auth";

const MyTrips = () => {
  const navigate = useNavigate();
  const [upcomingTrips, setUpcomingTrips] = useState<TicketData[]>([]);
  const [pastTrips, setPastTrips] = useState<TicketData[]>([]);
  const user = getCurrentUser();

  useEffect(() => {
    if (user?.email) {
      setUpcomingTrips(getUpcomingTickets(user.email));
      setPastTrips(getPastTickets(user.email));
    }
  }, [user?.email]);

  const TicketCard = ({ ticket }: { ticket: TicketData }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <BusIcon className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">{ticket.busOperator}</span>
            <span className="text-sm text-muted-foreground">• {ticket.busType}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{ticket.source}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{ticket.destination}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {ticket.departureDate}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {ticket.departureTime}
            </div>
            <div className="flex items-center gap-1">
              <Ticket className="h-4 w-4" />
              Seat {ticket.seatNumber}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            ticket.status === "upcoming" 
              ? "bg-travel-green/10 text-travel-green" 
              : ticket.status === "completed"
              ? "bg-muted text-muted-foreground"
              : "bg-destructive/10 text-destructive"
          }`}>
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/ticket/${ticket.id}`)}
          >
            View Ticket
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const EmptyState = ({ type }: { type: "upcoming" | "past" }) => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Ticket className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No {type} trips
      </h3>
      <p className="text-muted-foreground mb-6">
        {type === "upcoming" 
          ? "You don't have any upcoming trips. Book your next adventure!"
          : "You haven't completed any trips yet."}
      </p>
      {type === "upcoming" && (
        <Button variant="travel" onClick={() => navigate("/")}>
          Search Buses
        </Button>
      )}
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Ticket className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Sign in to view your trips</h1>
            <p className="text-muted-foreground mb-6">
              Track your bookings, view ticket details, and manage your trips
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="travel" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button variant="outline" onClick={() => navigate("/signup")}>
                Create Account
              </Button>
            </div>
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
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Trips</h1>
            <p className="text-muted-foreground">
              View and manage all your bus bookings
            </p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming ({upcomingTrips.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="gap-2">
                <Clock className="h-4 w-4" />
                Past ({pastTrips.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {upcomingTrips.length > 0 ? (
                <div className="space-y-4">
                  {upcomingTrips.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              ) : (
                <EmptyState type="upcoming" />
              )}
            </TabsContent>

            <TabsContent value="past">
              {pastTrips.length > 0 ? (
                <div className="space-y-4">
                  {pastTrips.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              ) : (
                <EmptyState type="past" />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyTrips;
