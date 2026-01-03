import { motion } from "framer-motion";
import { Smartphone, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppPromo = () => {
  return (
    <section className="py-16 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
              Get the <span className="text-primary">RedBus App</span>
            </h2>
            <p className="text-secondary-foreground/70 text-lg mb-8">
              Download our mobile app for a seamless booking experience. 
              Get exclusive app-only deals and manage your trips on the go.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-secondary-foreground/10 rounded-full px-4 py-2">
                <Star className="h-5 w-5 text-travel-gold fill-travel-gold" />
                <span className="text-secondary-foreground font-medium">4.8 Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary-foreground/10 rounded-full px-4 py-2">
                <Download className="h-5 w-5 text-primary" />
                <span className="text-secondary-foreground font-medium">10M+ Downloads</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="travel" size="lg" className="gap-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 2.047c-.483-.002-.97.102-1.403.316l-.024.012-9.116 4.558a2.77 2.77 0 0 0-1.535 2.49v5.153a2.77 2.77 0 0 0 1.535 2.49l9.116 4.558.024.012c.433.214.92.318 1.403.316a2.77 2.77 0 0 0 2.733-2.77V4.818a2.77 2.77 0 0 0-2.733-2.77zm-5.18 8.453L5.5 12.5l6.843 2v-4z"/>
                </svg>
                Play Store
              </Button>
              <Button variant="travel-outline" size="lg" className="gap-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </Button>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              
              {/* Phone Frame */}
              <div className="relative bg-gradient-to-b from-foreground/90 to-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-background rounded-[2.5rem] overflow-hidden w-64 h-[520px] relative">
                  {/* Phone Screen Content */}
                  <div className="bg-primary h-32 flex items-center justify-center">
                    <Smartphone className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="h-10 bg-muted rounded-lg" />
                    <div className="h-24 bg-muted rounded-lg" />
                    <div className="h-16 bg-muted rounded-lg" />
                    <div className="h-16 bg-muted rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
