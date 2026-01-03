import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, Menu, X, User, ChevronDown, Ticket, Heart, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/30 transition-colors" />
              <Bus className="relative h-8 w-8 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Red<span className="text-primary">Bus</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Bus Tickets
            </Link>
            <Link 
              to="/trips" 
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              My Trips
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-medium">
                  More <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover">
                <DropdownMenuItem asChild>
                  <Link to="/trip-planner" className="flex items-center gap-2 cursor-pointer">
                    <Ticket className="h-4 w-4" />
                    Trip Planner
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/offers" className="flex items-center gap-2 cursor-pointer">
                    <Heart className="h-4 w-4" />
                    Offers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/help" className="flex items-center gap-2 cursor-pointer">
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="travel-ghost" size="sm" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-1" />
                Login
              </Link>
            </Button>
            <Button variant="travel" size="sm" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bus Tickets
              </Link>
              <Link 
                to="/trips" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Trips
              </Link>
              <Link 
                to="/trip-planner" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trip Planner
              </Link>
              <div className="flex gap-3 pt-2 border-t border-border">
                <Button variant="travel-ghost" className="flex-1" asChild>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                </Button>
                <Button variant="travel" className="flex-1" asChild>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
