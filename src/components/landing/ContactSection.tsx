import { MessageCircle, Mail, Phone, MapPin, Send, Sparkles, User, MessageSquare } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@photoai.in", href: "mailto:hello@photoai.in" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: MapPin, label: "Location", value: "Surat, Gujarat", href: "#" }
  ];

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 lg:py-24 bg-gradient-soft relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Mobile Responsive */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-primary/10 border border-primary/30 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6">
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">Get In Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-3 sm:mb-4 px-2">
            Have Questions?
            <br />
            <span className="text-gradient-primary">We're Here to Help</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Send us a message and we'll respond within 24 hours.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left Side - Contact Info - Mobile Responsive */}
          <div className="bg-gradient-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden order-2 lg:order-1">
            {/* Decorative elements - Mobile Optimized */}
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-accent/20 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">Contact Information</h3>
              <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
                Reach out to us through any of these channels. We're always happy to help!
              </p>

              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm hover:bg-white/20 active:bg-white/20 transition-all duration-300 group border border-white/10 hover:border-white/20 touch-manipulation active:scale-[0.98] min-h-[60px] sm:min-h-0"
                  >
                    <div className="p-2.5 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white/70 uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="font-semibold text-sm sm:text-base truncate">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form - Mobile Responsive */}
          <div className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 xl:p-10 shadow-card border-2 border-border/50 order-1 lg:order-2">
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-black text-foreground mb-2">Send us a Message</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Fill out the form below and we'll get back to you soon.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Field - Mobile Responsive */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11 sm:h-12 rounded-lg sm:rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
                  required
                />
              </div>

              {/* Email Field - Mobile Responsive */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-11 sm:h-12 rounded-lg sm:rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
                  required
                />
              </div>

              {/* Phone Field - Mobile Responsive */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-11 sm:h-12 rounded-lg sm:rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
                />
              </div>

              {/* Subject Field - Mobile Responsive */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="subject" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="h-11 sm:h-12 rounded-lg sm:rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
                />
              </div>

              {/* Message Field - Mobile Responsive */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="message" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-28 sm:min-h-32 rounded-lg sm:rounded-xl border-border/50 bg-background resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
                  required
                />
              </div>

              {/* Submit Button - Mobile Responsive */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white rounded-lg sm:rounded-xl py-5 sm:py-6 text-sm sm:text-base font-bold group shadow-lg hover:shadow-glow transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4 sm:mt-6 touch-manipulation active:scale-[0.98] min-h-[48px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Sending Message...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
