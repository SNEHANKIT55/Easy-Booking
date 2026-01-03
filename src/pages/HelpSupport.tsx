import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Phone, Mail, MessageCircle, ChevronDown, Search, MapPin, Clock, CreditCard, Ticket } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";

const faqs = [
  {
    category: "Booking",
    icon: Ticket,
    questions: [
      {
        q: "How do I book a bus ticket?",
        a: "Search for buses by entering your source, destination, and travel date. Select a bus, choose your seats, enter passenger details, and complete the payment to confirm your booking.",
      },
      {
        q: "Can I book tickets for someone else?",
        a: "Yes, you can book tickets for others. Just enter their details in the passenger information section during checkout.",
      },
      {
        q: "How many seats can I book at once?",
        a: "You can book up to 6 seats in a single transaction. For group bookings larger than 6, please contact our customer support.",
      },
    ],
  },
  {
    category: "Cancellation & Refund",
    icon: CreditCard,
    questions: [
      {
        q: "How do I cancel my booking?",
        a: "Go to 'My Trips', find your booking, and click 'Cancel'. The refund will be processed based on the cancellation policy.",
      },
      {
        q: "What is the refund policy?",
        a: "Refund amount depends on how early you cancel. Cancellations 24+ hours before departure get up to 75% refund. Less than 24 hours may have higher deductions or no refund.",
      },
      {
        q: "How long does the refund take?",
        a: "Refunds are typically processed within 5-7 business days to the original payment method.",
      },
    ],
  },
  {
    category: "Travel Information",
    icon: MapPin,
    questions: [
      {
        q: "How do I find my boarding point?",
        a: "Your ticket contains the exact boarding point address. You'll also receive location details via SMS/email after booking.",
      },
      {
        q: "What should I carry for boarding?",
        a: "Carry a valid photo ID (Aadhar, Passport, Driving License) and your ticket (printed or on mobile).",
      },
      {
        q: "What if I miss my bus?",
        a: "Unfortunately, missed buses are not refundable. We recommend arriving at the boarding point 15-20 minutes early.",
      },
    ],
  },
  {
    category: "Payment",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept Credit/Debit Cards, UPI, Net Banking, and popular wallets like Paytm, PhonePe, and Google Pay.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, all payments are processed through secure, PCI-DSS compliant payment gateways with 256-bit encryption.",
      },
      {
        q: "Can I pay in installments?",
        a: "EMI options are available for bookings above ₹3000 on select credit cards.",
      },
    ],
  },
];

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setContactForm({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const filteredFaqs = searchQuery
    ? faqs.map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((category) => category.questions.length > 0)
    : faqs;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How can we help you?
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Find answers to common questions or get in touch with our support team
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </motion.div>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <motion.a
              href="tel:1800-123-4567"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-travel-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-travel-green" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
              <p className="text-primary font-medium">1800-123-4567</p>
              <p className="text-sm text-muted-foreground">24/7 Support</p>
            </motion.a>

            <motion.a
              href="mailto:support@redbus.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
              <p className="text-primary font-medium">support@redbus.com</p>
              <p className="text-sm text-muted-foreground">Response within 24 hrs</p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-travel-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-travel-orange" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
              <p className="text-primary font-medium">Chat Now</p>
              <p className="text-sm text-muted-foreground">Instant support</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
            {/* FAQs Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {filteredFaqs.map((category, catIndex) => (
                  <div key={category.category} className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/30">
                      <category.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{category.category}</h3>
                    </div>
                    <Accordion type="single" collapsible className="px-4">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`${catIndex}-${index}`}>
                          <AccordionTrigger className="text-left text-foreground hover:text-primary">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl border border-border p-6 h-fit sticky top-20"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="John Doe"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    placeholder="Booking Issue"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Describe your issue or question..."
                    rows={4}
                    required
                    className="mt-1.5"
                  />
                </div>

                <Button
                  type="submit"
                  variant="travel"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpSupport;
