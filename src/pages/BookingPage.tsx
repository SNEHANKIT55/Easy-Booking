import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, User, Clock, Star, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SeatLayout from "@/components/booking/SeatLayout";
import BookingSummary from "@/components/booking/BookingSummary";
import { Button } from "@/components/ui/button";
import { Seat } from "@/types/bus";

// Mock bus data
const MOCK_BUS = {
  id: "1",
  operator: "VRL Travels",
  busType: "Volvo Multi-Axle A/C Sleeper",
  departureTime: "21:00",
  arrivalTime: "06:30",
  duration: "9h 30m",
  price: 1299,
  rating: 4.5,
  totalReviews: 2456,
  from: "Bangalore",
  to: "Chennai",
  date: new Date().toISOString(),
  boardingPoints: [
    { id: "b1", name: "Majestic", time: "21:00" },
    { id: "b2", name: "Electronic City", time: "21:45" },
    { id: "b3", name: "Silk Board", time: "22:00" },
  ],
  droppingPoints: [
    { id: "d1", name: "Koyambedu", time: "06:00" },
    { id: "d2", name: "Tambaram", time: "06:30" },
    { id: "d3", name: "Guindy", time: "05:45" },
  ],
};

// Generate mock seat layout
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const bookedSeats = ["L1", "L3", "L7", "U2", "U5", "U8"];
  const ladiesSeats = ["L2", "U1"];

  // Lower deck - 2 columns with aisle
  for (let row = 0; row < 5; row++) {
    // Left side
    seats.push({
      id: `L${row * 2 + 1}`,
      number: `L${row * 2 + 1}`,
      type: "sleeper",
      deck: "lower",
      position: { row, col: 0 },
      price: 1299,
      status: bookedSeats.includes(`L${row * 2 + 1}`)
        ? "booked"
        : ladiesSeats.includes(`L${row * 2 + 1}`)
        ? "ladies"
        : "available",
    });
    // Right side
    seats.push({
      id: `L${row * 2 + 2}`,
      number: `L${row * 2 + 2}`,
      type: "sleeper",
      deck: "lower",
      position: { row, col: 2 },
      price: 1299,
      status: bookedSeats.includes(`L${row * 2 + 2}`)
        ? "booked"
        : ladiesSeats.includes(`L${row * 2 + 2}`)
        ? "ladies"
        : "available",
    });
  }

  // Upper deck
  for (let row = 0; row < 5; row++) {
    seats.push({
      id: `U${row * 2 + 1}`,
      number: `U${row * 2 + 1}`,
      type: "sleeper",
      deck: "upper",
      position: { row, col: 0 },
      price: 1199,
      status: bookedSeats.includes(`U${row * 2 + 1}`)
        ? "booked"
        : ladiesSeats.includes(`U${row * 2 + 1}`)
        ? "ladies"
        : "available",
    });
    seats.push({
      id: `U${row * 2 + 2}`,
      number: `U${row * 2 + 2}`,
      type: "sleeper",
      deck: "upper",
      position: { row, col: 2 },
      price: 1199,
      status: bookedSeats.includes(`U${row * 2 + 2}`)
        ? "booked"
        : ladiesSeats.includes(`U${row * 2 + 2}`)
        ? "ladies"
        : "available",
    });
  }

  return seats;
};

const BookingPage = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState(MOCK_BUS.boardingPoints[0].id);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState(MOCK_BUS.droppingPoints[0].id);

  const selectedSeats = useMemo(() => seats.filter((s) => s.status === "selected"), [seats]);

  const handleSeatClick = (seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) => {
        if (seat.id === seatId) {
          if (seat.status === "available" || seat.status === "ladies") {
            return { ...seat, status: "selected" };
          } else if (seat.status === "selected") {
            return { ...seat, status: "available" };
          }
        }
        return seat;
      })
    );
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    navigate("/checkout", {
      state: {
        bus: MOCK_BUS,
        selectedSeats,
        boardingPoint: MOCK_BUS.boardingPoints.find((p) => p.id === selectedBoardingPoint),
        droppingPoint: MOCK_BUS.droppingPoints.find((p) => p.id === selectedDroppingPoint),
        totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to results
          </Button>

          {/* Bus Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl border border-border p-6 mb-6"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{MOCK_BUS.operator}</h1>
                <p className="text-muted-foreground">{MOCK_BUS.busType}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-travel-green/10 text-travel-green px-2 py-0.5 rounded">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-sm font-semibold">{MOCK_BUS.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({MOCK_BUS.totalReviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{MOCK_BUS.departureTime}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_BUS.from}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{MOCK_BUS.duration}</span>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{MOCK_BUS.arrivalTime}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_BUS.to}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6">
            {/* Left Column - Seat Layout & Points */}
            <div className="space-y-6">
              {/* Seat Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-6">Select Seats</h2>
                <SeatLayout seats={seats} onSeatClick={handleSeatClick} />
              </motion.div>

              {/* Boarding & Dropping Points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Boarding Point */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-travel-green" />
                    Boarding Point
                  </h3>
                  <div className="space-y-3">
                    {MOCK_BUS.boardingPoints.map((point) => (
                      <label
                        key={point.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedBoardingPoint === point.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="boarding"
                            value={point.id}
                            checked={selectedBoardingPoint === point.id}
                            onChange={() => setSelectedBoardingPoint(point.id)}
                            className="accent-primary"
                          />
                          <span className="text-foreground">{point.name}</span>
                        </div>
                        <span className="text-muted-foreground text-sm">{point.time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dropping Point */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Dropping Point
                  </h3>
                  <div className="space-y-3">
                    {MOCK_BUS.droppingPoints.map((point) => (
                      <label
                        key={point.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedDroppingPoint === point.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="dropping"
                            value={point.id}
                            checked={selectedDroppingPoint === point.id}
                            onChange={() => setSelectedDroppingPoint(point.id)}
                            className="accent-primary"
                          />
                          <span className="text-foreground">{point.name}</span>
                        </div>
                        <span className="text-muted-foreground text-sm">{point.time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <BookingSummary
                selectedSeats={selectedSeats}
                totalAmount={totalAmount}
                onProceed={handleProceed}
              />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
