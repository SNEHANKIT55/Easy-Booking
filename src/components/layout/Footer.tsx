import { Link } from "react-router-dom";
import { Bus, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Bus className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">
                Red<span className="text-primary">Bus</span>
              </span>
            </Link>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              India's largest online bus ticketing platform. Book bus tickets with ease and travel comfortably.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/buses" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  Search Buses
                </Link>
              </li>
              <li>
                <Link to="/trips" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/trip-planner" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Popular Routes</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  Delhi to Jaipur
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  Mumbai to Pune
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  Bangalore to Chennai
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  Hyderabad to Bangalore
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  Kolkata to Digha
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/70 text-sm">
                  123 Travel Street, Tech Park, Bangalore - 560001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-secondary-foreground/70 text-sm">
                  +91 9876 543 210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-secondary-foreground/70 text-sm">
                  support@redbus.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            © 2024 RedBus Clone. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
