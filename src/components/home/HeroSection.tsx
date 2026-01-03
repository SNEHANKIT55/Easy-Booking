import { motion } from "framer-motion";
import SearchForm from "@/components/search/SearchForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />

      {/* Animated Circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 pt-12 pb-20 md:pt-20 md:pb-28 relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-primary-foreground">Book Bus Tickets</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Anytime, Anywhere
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-4"
          >
            India's largest online bus ticketing platform with 3500+ operators, 
            100,000+ routes, and millions of happy travelers.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">3500+</p>
              <p className="text-primary-foreground/70 text-sm">Bus Operators</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">100K+</p>
              <p className="text-primary-foreground/70 text-sm">Routes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">25M+</p>
              <p className="text-primary-foreground/70 text-sm">Happy Customers</p>
            </div>
          </motion.div>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto">
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
