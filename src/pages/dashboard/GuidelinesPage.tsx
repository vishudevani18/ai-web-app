import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2,
  XCircle,
  Shirt,
  Camera,
  ChevronDown,
  ShoppingBag,
  CreditCard,
  Plus
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GuidelinesPage = () => {
  const navigate = useNavigate();

  const guidelines = [
    {
      title: "Show Full Clothing",
      titleHindi: "पूरे कपड़े दिखाएं",
      icon: Shirt,
      gradient: "from-teal-400 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-50",
      goodExample: "✓ Full kurti/saree visible from top to bottom",
      badExample: "✗ Cut-off or cropped clothing",
      dos: [
        "Capture complete garment - neckline to hem",
        "Show full sleeves and all design details",
        "Include the entire product in frame"
      ],
      donts: [
        "Don't crop any part of clothing",
        "Don't hide sleeves or borders",
        "Don't cut off bottom portion"
      ]
    },
    {
      title: "Clean & Clear Photo",
      titleHindi: "साफ और स्पष्ट फोटो",
      icon: Camera,
      gradient: "from-blue-400 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      goodExample: "✓ Clean background, good lighting",
      badExample: "✗ Messy background, dark photo",
      dos: [
        "Use plain/white background",
        "Take photo in good daylight",
        "Keep image sharp and clear"
      ],
      donts: [
        "Don't use blurry photos",
        "Don't include other items",
        "Don't use dark or shadowy photos"
      ]
    },
  ];

  const faqs = [
    {
      question: "How to create product catalog for e-commerce?",
      questionHindi: "ई-कॉमर्स के लिए प्रोडक्ट कैटलॉग कैसे बनाएं?",
      answer: "To create a professional e-commerce catalog with the same product:\n\n1. Upload the SAME product image each time\n2. Select the SAME background theme for consistency\n3. Change ONLY the model pose for each image\n4. Generate 3-5 images with different poses\n\nThis gives you a complete catalog with consistent look for Amazon, Flipkart, Myntra, etc."
    },
    {
      question: "Can I cancel image generation or get refund?",
      questionHindi: "क्या मैं इमेज जनरेशन रद्द कर सकता हूं?",
      answer: "No, once the image generation starts, it cannot be cancelled. Credits used for generation are non-refundable. Please review your selections carefully before clicking 'Generate'."
    },
    {
      question: "What image formats are supported?",
      questionHindi: "कौन से इमेज फॉर्मेट सपोर्ट हैं?",
      answer: "We support JPG and PNG formats. For best results, use high-quality images (minimum 1000x1000 pixels)."
    },
    {
      question: "How long are generated images available?",
      questionHindi: "जनरेट की गई इमेज कितने समय तक उपलब्ध रहती हैं?",
      answer: "Generated images are available in your Gallery for 24 hours. Please download them before they expire. After 24 hours, images are automatically deleted."
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-4">
          Image <span className="text-gradient-primary">Guidelines</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Follow these tips for best AI results • बेहतर AI रिजल्ट के लिए इन टिप्स को फॉलो करें
        </p>
      </div>

      {/* Visual Guidelines Cards */}
      <div className="space-y-6">
        {guidelines.map((section, index) => (
          <Card key={index} className="border-2 border-border/50 shadow-card overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Left - Title Section */}
                <div className={`lg:w-64 p-6 bg-gradient-to-br ${section.bgGradient} flex flex-col justify-center border-r border-border/30`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-lg mb-4`}>
                    <section.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-xl font-black text-foreground mb-1">{section.title}</h2>
                  <p className="text-sm text-muted-foreground font-medium">{section.titleHindi}</p>
                </div>
                
                {/* Right - Do's and Don'ts */}
                <div className="flex-1 p-6">
                  {/* Visual Example Row */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-200 text-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-emerald-700">{section.goodExample}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 text-center">
                      <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-red-600">{section.badExample}</p>
                    </div>
                  </div>

                  {/* Lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Do's */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-black text-emerald-600 mb-3">
                        <CheckCircle2 className="w-4 h-4" />
                        DO THIS ✓
                      </h3>
                      <ul className="space-y-2">
                        {section.dos.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="text-emerald-500 mt-1 font-bold">•</span>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Don'ts */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-black text-red-500 mb-3">
                        <XCircle className="w-4 h-4" />
                        DON'T DO ✗
                      </h3>
                      <ul className="space-y-2">
                        {section.donts.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="text-red-400 mt-1 font-bold">•</span>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important Notice */}
      <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-card">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center shrink-0 shadow-lg">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h3 className="font-black text-amber-900 text-lg mb-2">
                Important • महत्वपूर्ण
              </h3>
              <p className="text-sm text-amber-800 font-medium mb-2">
                If any part of your clothing is missing or cut-off in the uploaded photo, 
                the AI will not be able to generate accurate results. Always upload complete, 
                full photos of your product.
              </p>
              <p className="text-sm text-amber-700">
                अगर अपलोड की गई फोटो में कपड़े का कोई हिस्सा कटा हुआ है, तो AI सही रिजल्ट नहीं दे पाएगा।
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-foreground text-center">
          Frequently Asked Questions • अक्सर पूछे जाने वाले प्रश्न
        </h2>
        
        <Card className="border-2 border-border/50 shadow-card">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50 last:border-0">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-gradient-primary/10 flex items-center justify-center shrink-0">
                        {index === 0 && <ShoppingBag className="w-5 h-5 text-primary" />}
                        {index === 1 && <CreditCard className="w-5 h-5 text-primary" />}
                        {index === 2 && <Camera className="w-5 h-5 text-primary" />}
                        {index === 3 && <Shirt className="w-5 h-5 text-primary" />}
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-base">{faq.question}</p>
                        <p className="text-xs text-muted-foreground mt-1">{faq.questionHindi}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pl-14">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="border-0 bg-gradient-primary overflow-hidden shadow-2xl">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-2">Ready to Create?</h3>
          <p className="text-white/90 text-base mb-6">
            Start generating professional product images now
          </p>
          <Button 
            onClick={() => navigate('/dashboard/create')}
            className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-6 text-base shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Image
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidelinesPage;
