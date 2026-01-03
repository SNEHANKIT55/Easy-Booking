import { motion } from "framer-motion";
import { Tag, Percent, Clock, Gift, Ticket, CreditCard } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const offers = [
  {
    id: 1,
    title: "First Trip Discount",
    description: "Get 20% off on your first bus booking. Use code FIRST20 at checkout.",
    code: "FIRST20",
    discount: "20% OFF",
    validTill: "31 Dec 2024",
    icon: Gift,
    color: "bg-travel-green",
  },
  {
    id: 2,
    title: "Weekend Special",
    description: "Flat ₹150 off on all weekend bookings. Minimum booking value ₹500.",
    code: "WEEKEND150",
    discount: "₹150 OFF",
    validTill: "Every Weekend",
    icon: Tag,
    color: "bg-primary",
  },
  {
    id: 3,
    title: "Cashback Offer",
    description: "Get 10% cashback up to ₹200 on payments via UPI. No minimum order.",
    code: "UPICASH",
    discount: "10% Cashback",
    validTill: "15 Jan 2025",
    icon: CreditCard,
    color: "bg-travel-orange",
  },
  {
    id: 4,
    title: "Group Booking",
    description: "Book for 4 or more passengers and get 15% off on total booking.",
    code: "GROUP15",
    discount: "15% OFF",
    validTill: "Ongoing",
    icon: Ticket,
    color: "bg-accent",
  },
  {
    id: 5,
    title: "Super Saver",
    description: "Book 3 days in advance and save up to ₹300 on AC sleeper buses.",
    code: "EARLY300",
    discount: "Up to ₹300",
    validTill: "28 Feb 2025",
    icon: Percent,
    color: "bg-secondary",
  },
  {
    id: 6,
    title: "Night Travel Deal",
    description: "Flat 12% off on night departures (10 PM - 6 AM). Max discount ₹250.",
    code: "NIGHT12",
    discount: "12% OFF",
    validTill: "Ongoing",
    icon: Clock,
    color: "bg-travel-navy",
  },
];

const Offers = () => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary to-travel-coral rounded-2xl p-8 md:p-12 mb-8 text-white"
          >
            <div className="max-w-2xl">
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                Exclusive Offers
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Save Big on Your Bus Bookings
              </h1>
              <p className="text-white/80 text-lg">
                Discover amazing deals and discounts on bus tickets. Book smart, travel happy!
              </p>
            </div>
          </motion.div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`${offer.color} p-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <offer.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-white text-lg">{offer.discount}</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {offer.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Valid till:</span>
                      <span className="text-sm font-medium text-foreground">{offer.validTill}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-lg px-4 py-2 font-mono font-semibold text-foreground text-center">
                      {offer.code}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyCode(offer.code)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terms Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-card rounded-xl border border-border p-6"
          >
            <h2 className="font-semibold text-foreground mb-4">Terms & Conditions</h2>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Offers are subject to availability and can be withdrawn without notice.</li>
              <li>• Only one coupon code can be applied per booking.</li>
              <li>• Cashback offers are credited within 24-48 hours of trip completion.</li>
              <li>• Discounts are applicable on base fare only, excluding taxes and fees.</li>
              <li>• For any queries, contact our customer support.</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Offers;
