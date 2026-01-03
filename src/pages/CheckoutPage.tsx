import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, User, CreditCard } from "lucide-react";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PassengerDetail, Seat } from "@/types/bus";
import { saveTickets, generateBookingId, TicketData } from "@/utils/ticketStorage";

const passengerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  age: z.number().min(1, "Invalid age").max(120),
  gender: z.enum(["male", "female", "other"]),
});

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, selectedSeats, boardingPoint, droppingPoint, totalAmount } = location.state || {};

  const [passengers, setPassengers] = useState<PassengerDetail[]>(
    selectedSeats?.map((seat: Seat) => ({
      name: "",
      age: 0,
      gender: "male" as const,
      seatNumber: seat.number,
    })) || []
  );
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bus || !selectedSeats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No booking data found</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const updatePassenger = (index: number, field: keyof PassengerDetail, value: string | number) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = async () => {
    // Validate all passengers
    for (let i = 0; i < passengers.length; i++) {
      const result = passengerSchema.safeParse({
        name: passengers[i].name,
        age: passengers[i].age,
        gender: passengers[i].gender,
      });

      if (!result.success) {
        toast({
          title: `Invalid passenger ${i + 1} details`,
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    if (!contactEmail || !contactPhone) {
      toast({
        title: "Contact details required",
        description: "Please provide email and phone number",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate booking ID and save tickets
    const bookingId = generateBookingId();
    const ticketsToSave: Omit<TicketData, "id">[] = passengers.map((passenger) => ({
      bookingId,
      passengerName: passenger.name,
      passengerAge: passenger.age,
      passengerGender: passenger.gender,
      seatNumber: passenger.seatNumber,
      busOperator: bus.operator,
      busType: bus.busType,
      source: "Mumbai", // These would come from search params in a real app
      destination: "Pune",
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      departureDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      boardingPoint: boardingPoint?.name || "Main Bus Stand",
      droppingPoint: droppingPoint?.name || "Central Station",
      amount: Math.round(totalAmount / passengers.length),
      contactEmail,
      contactPhone,
      bookingDate: new Date().toISOString(),
      status: "upcoming" as const,
    }));

    saveTickets(ticketsToSave);

    setIsProcessing(false);

    toast({
      title: "Booking Confirmed!",
      description: "Your tickets have been booked successfully",
    });

    // Navigate to success page with booking data
    navigate("/ticket/success", {
      state: {
        bookingId,
        contactEmail,
      },
    });
  };
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to seat selection
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Passenger Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Passenger Details
                </h2>

                <div className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="p-4 bg-muted/30 rounded-lg border border-border"
                    >
                      <h3 className="font-medium text-foreground mb-4">
                        Passenger {index + 1} - Seat {passenger.seatNumber}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor={`name-${index}`}>Full Name</Label>
                          <Input
                            id={`name-${index}`}
                            placeholder="Enter full name"
                            value={passenger.name}
                            onChange={(e) =>
                              updatePassenger(index, "name", e.target.value)
                            }
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`age-${index}`}>Age</Label>
                          <Input
                            id={`age-${index}`}
                            type="number"
                            placeholder="Age"
                            value={passenger.age || ""}
                            onChange={(e) =>
                              updatePassenger(index, "age", parseInt(e.target.value) || 0)
                            }
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`gender-${index}`}>Gender</Label>
                          <select
                            id={`gender-${index}`}
                            value={passenger.gender}
                            onChange={(e) =>
                              updatePassenger(index, "gender", e.target.value)
                            }
                            className="mt-1.5 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Contact Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl border border-border p-6 sticky top-20 h-fit"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Summary
              </h2>

              {/* Trip Info */}
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <p className="font-semibold text-foreground">{bus.operator}</p>
                <p className="text-sm text-muted-foreground">{bus.busType}</p>
                <div className="flex justify-between mt-3 text-sm">
                  <span className="text-muted-foreground">Departure</span>
                  <span className="text-foreground">{bus.departureTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Arrival</span>
                  <span className="text-foreground">{bus.arrivalTime}</span>
                </div>
              </div>

              {/* Seats */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Selected Seats</span>
                  <span className="text-foreground">
                    {selectedSeats.map((s: Seat) => s.number).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Boarding</span>
                  <span className="text-foreground">{boardingPoint?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dropping</span>
                  <span className="text-foreground">{droppingPoint?.name}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{totalAmount}</span>
                </div>
              </div>

              <Button
                variant="travel"
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By proceeding, you agree to our terms and conditions
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
