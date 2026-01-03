import { motion } from "framer-motion";
import { Shield, Clock, Headphones, CreditCard, MapPin, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All buses are sanitized and follow safety protocols",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Book tickets anytime, travel anywhere",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Dedicated support for all your queries",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Multiple payment options available",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track your bus in real-time",
  },
  {
    icon: Star,
    title: "Best Prices",
    description: "Guaranteed lowest fares on all routes",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">RedBus?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the best bus booking service with amazing features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
