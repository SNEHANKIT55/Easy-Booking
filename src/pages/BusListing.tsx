import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchForm from "@/components/search/SearchForm";
import BusCard from "@/components/buses/BusCard";
import BusFilters from "@/components/buses/BusFilters";
import { Bus } from "@/types/bus";

// Mock bus data
const MOCK_BUSES: Bus[] = [
  {
    id: "1",
    operator: "VRL Travels",
    busType: "Volvo Multi-Axle A/C Sleeper",
    departureTime: "21:00",
    arrivalTime: "06:30",
    duration: "9h 30m",
    price: 1299,
    originalPrice: 1599,
    rating: 4.5,
    totalReviews: 2456,
    seatsAvailable: 12,
    amenities: ["wifi", "charging", "blanket", "water"],
    boardingPoints: ["Majestic", "Electronic City", "Silk Board"],
    droppingPoints: ["Koyambedu", "Tambaram", "Guindy"],
  },
  {
    id: "2",
    operator: "SRS Travels",
    busType: "Scania Multi-Axle A/C Sleeper",
    departureTime: "22:30",
    arrivalTime: "07:00",
    duration: "8h 30m",
    price: 1499,
    rating: 4.7,
    totalReviews: 3120,
    seatsAvailable: 8,
    amenities: ["wifi", "charging", "blanket", "water", "entertainment"],
    boardingPoints: ["Majestic", "Yeshwantpur"],
    droppingPoints: ["Koyambedu", "CMBT"],
  },
  {
    id: "3",
    operator: "Orange Travels",
    busType: "Volvo A/C Semi-Sleeper",
    departureTime: "23:00",
    arrivalTime: "08:00",
    duration: "9h 00m",
    price: 899,
    originalPrice: 1099,
    rating: 4.2,
    totalReviews: 1890,
    seatsAvailable: 25,
    amenities: ["charging", "water"],
    boardingPoints: ["Majestic", "Madiwala"],
    droppingPoints: ["Koyambedu", "Vadapalani"],
  },
  {
    id: "4",
    operator: "Kallada Travels",
    busType: "Mercedes Benz Multi-Axle A/C Sleeper",
    departureTime: "20:30",
    arrivalTime: "05:30",
    duration: "9h 00m",
    price: 1699,
    rating: 4.8,
    totalReviews: 4521,
    seatsAvailable: 5,
    amenities: ["wifi", "charging", "blanket", "water", "entertainment", "snacks"],
    boardingPoints: ["Majestic", "Hebbal"],
    droppingPoints: ["Koyambedu", "Porur"],
  },
  {
    id: "5",
    operator: "KPN Travels",
    busType: "Volvo A/C Seater/Sleeper",
    departureTime: "19:00",
    arrivalTime: "04:30",
    duration: "9h 30m",
    price: 749,
    rating: 4.0,
    totalReviews: 980,
    seatsAvailable: 30,
    amenities: ["charging"],
    boardingPoints: ["Majestic", "Tin Factory"],
    droppingPoints: ["Koyambedu"],
  },
];

export interface FilterState {
  priceRange: [number, number];
  busTypes: string[];
  departureTime: string[];
  operators: string[];
  amenities: string[];
  rating: number;
}

const BusListing = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "Bangalore";
  const to = searchParams.get("to") || "Chennai";
  const dateParam = searchParams.get("date");
  const date = dateParam ? new Date(dateParam) : new Date();

  const [sortBy, setSortBy] = useState<string>("departure");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000],
    busTypes: [],
    departureTime: [],
    operators: [],
    amenities: [],
    rating: 0,
  });

  const filteredBuses = useMemo(() => {
    let result = [...MOCK_BUSES];

    // Apply price filter
    result = result.filter(
      (bus) => bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter((bus) => bus.rating >= filters.rating);
    }

    // Apply bus type filter
    if (filters.busTypes.length > 0) {
      result = result.filter((bus) =>
        filters.busTypes.some((type) => bus.busType.toLowerCase().includes(type.toLowerCase()))
      );
    }

    // Apply operator filter
    if (filters.operators.length > 0) {
      result = result.filter((bus) =>
        filters.operators.includes(bus.operator)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "departure":
        result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      {/* Search Section */}
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <SearchForm />
        </div>
      </section>

      {/* Results Header */}
      <section className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {from} → {to}
              </h1>
              <p className="text-muted-foreground">
                {format(date, "EEEE, dd MMM yyyy")} • {filteredBuses.length} buses found
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="departure">Departure Time</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block">
              <BusFilters filters={filters} onFilterChange={setFilters} />
            </aside>

            {/* Bus List */}
            <div className="space-y-4">
              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus, index) => (
                  <motion.div
                    key={bus.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BusCard bus={bus} />
                  </motion.div>
                ))
              ) : (
                <div className="bg-card rounded-xl p-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    No buses found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BusListing;
