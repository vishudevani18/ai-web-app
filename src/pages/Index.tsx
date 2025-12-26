import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
