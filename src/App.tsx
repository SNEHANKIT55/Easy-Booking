import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import BusListing from "./pages/BusListing";
import BookingPage from "./pages/BookingPage";
import CheckoutPage from "./pages/CheckoutPage";
import TripPlanner from "./pages/TripPlanner";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import MyTrips from "./pages/MyTrips";
import Offers from "./pages/Offers";
import HelpSupport from "./pages/HelpSupport";
import TicketSuccess from "./pages/Ticket/TicketSuccess";
import TicketDetails from "./pages/Ticket/TicketDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buses" element={<BusListing />} />
          <Route path="/booking/:busId" element={<BookingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/ticket/success" element={<TicketSuccess />} />
          <Route path="/ticket/:ticketId" element={<TicketDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
