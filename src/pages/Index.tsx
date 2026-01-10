import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustSection from "@/components/landing/TrustSection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustSection />
      <WhyChooseUsSection />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
