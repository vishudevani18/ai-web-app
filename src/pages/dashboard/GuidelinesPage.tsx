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
      answer: "We support JPG, PNG, and WEBP formats. For best results, use high-quality images (minimum 1000x1000 pixels)."
    },
    {
      question: "How long are generated images available?",
      questionHindi: "जनरेट की गई इमेज कितने समय तक उपलब्ध रहती हैं?",
      answer: "Generated images are available in your Gallery for 24 hours. Please download them before they expire. After 24 hours, images are automatically deleted."
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
          Image Guidelines
        </h1>
        <p className="text-slate-500">
          Follow these tips for best AI results • बेहतर AI रिजल्ट के लिए इन टिप्स को फॉलो करें
        </p>
      </div>

      {/* Visual Guidelines Cards */}
      <div className="space-y-4">
        {guidelines.map((section, index) => (
          <Card key={index} className="border-0 shadow-lg shadow-slate-100/80 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Left - Title Section */}
                <div className={`lg:w-56 p-5 bg-gradient-to-br ${section.bgGradient} flex flex-col justify-center`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-lg mb-3`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">{section.title}</h2>
                  <p className="text-sm text-slate-600">{section.titleHindi}</p>
                </div>
                
                {/* Right - Do's and Don'ts */}
                <div className="flex-1 p-5">
                  {/* Visual Example Row */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-200 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-xs font-medium text-emerald-700">{section.goodExample}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-red-50 border-2 border-red-200 text-center">
                      <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                      <p className="text-xs font-medium text-red-600">{section.badExample}</p>
                    </div>
                  </div>

                  {/* Lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Do's */}
                    <div>
                      <h3 className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        DO THIS ✓
                      </h3>
                      <ul className="space-y-1.5">
                        {section.dos.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Don'ts */}
                    <div>
                      <h3 className="flex items-center gap-1.5 text-xs font-semibold text-red-500 mb-2">
                        <XCircle className="w-3.5 h-3.5" />
                        DON'T DO ✗
                      </h3>
                      <ul className="space-y-1.5">
                        {section.donts.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-red-400 mt-0.5">•</span>
                            {item}
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
      <Card className="border-2 border-amber-200 bg-amber-50">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <span className="text-xl">⚠️</span>
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">
                Important • महत्वपूर्ण
              </h3>
              <p className="text-sm text-amber-700">
                If any part of your clothing is missing or cut-off in the uploaded photo, 
                the AI will not be able to generate accurate results. Always upload complete, 
                full photos of your product.
              </p>
              <p className="text-sm text-amber-600 mt-1">
                अगर अपलोड की गई फोटो में कपड़े का कोई हिस्सा कटा हुआ है, तो AI सही रिजल्ट नहीं दे पाएगा।
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 text-center">
          Frequently Asked Questions • अक्सर पूछे जाने वाले प्रश्न
        </h2>
        
        <Card className="border-0 shadow-lg shadow-slate-100/80">
          <CardContent className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                        {index === 0 && <ShoppingBag className="w-4 h-4 text-teal-600" />}
                        {index === 1 && <CreditCard className="w-4 h-4 text-teal-600" />}
                        {index === 2 && <Camera className="w-4 h-4 text-teal-600" />}
                        {index === 3 && <Shirt className="w-4 h-4 text-teal-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{faq.question}</p>
                        <p className="text-xs text-slate-500">{faq.questionHindi}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pl-11">
                    <p className="text-sm text-slate-600 whitespace-pre-line">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="border-0 bg-gradient-to-br from-teal-500 to-emerald-600 overflow-hidden">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Ready to Create?</h3>
          <p className="text-teal-100 text-sm mb-4">
            Start generating professional product images now
          </p>
          <Button 
            onClick={() => navigate('/dashboard/create')}
            className="bg-white text-teal-600 hover:bg-teal-50 font-semibold px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Image
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidelinesPage;
