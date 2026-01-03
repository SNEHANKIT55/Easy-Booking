import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

interface RouteCardProps {
  from: string;
  to: string;
  price: number;
  duration: string;
  buses: number;
  image?: string;
  delay?: number;
}

const RouteCard = ({ from, to, price, duration, buses, delay = 0 }: RouteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        {/* Gradient Header */}
        <div className="h-24 bg-gradient-to-r from-primary/80 to-accent/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-3 text-primary-foreground">
              <span className="font-semibold text-lg">{from}</span>
              <ArrowRight className="h-5 w-5" />
              <span className="font-semibold text-lg">{to}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-2xl font-bold text-foreground">
                ₹{price.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-1 text-travel-green text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Popular
            </div>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground border-t border-border pt-3">
            <span>{duration}</span>
            <span>{buses}+ buses</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PopularRoutes = () => {
  const routes = [
    { from: "Delhi", to: "Jaipur", price: 499, duration: "5-6 hrs", buses: 120 },
    { from: "Mumbai", to: "Pune", price: 350, duration: "3-4 hrs", buses: 200 },
    { from: "Bangalore", to: "Chennai", price: 650, duration: "6-7 hrs", buses: 150 },
    { from: "Hyderabad", to: "Bangalore", price: 750, duration: "8-10 hrs", buses: 100 },
    { from: "Delhi", to: "Agra", price: 299, duration: "3-4 hrs", buses: 80 },
    { from: "Kolkata", to: "Digha", price: 350, duration: "4-5 hrs", buses: 60 },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular <span className="text-primary">Routes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most traveled routes across India with the best prices and comfortable journeys
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <RouteCard
              key={`${route.from}-${route.to}`}
              {...route}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
