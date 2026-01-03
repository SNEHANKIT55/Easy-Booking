import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import PopularRoutes from "@/components/home/PopularRoutes";
import Features from "@/components/home/Features";
import AppPromo from "@/components/home/AppPromo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularRoutes />
        <Features />
        <AppPromo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
