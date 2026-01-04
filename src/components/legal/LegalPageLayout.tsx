import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Camera, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LegalPageLayoutProps {
  children: ReactNode;
  currentPage: "terms" | "privacy";
}

const LegalPageLayout = ({ children, currentPage }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 sm:gap-3 group touch-manipulation active:scale-95"
            >
              <div className="p-2 sm:p-2.5 bg-gradient-primary rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                PhotoAI
              </span>
            </Link>
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>

      <footer className="border-t border-border mt-12 sm:mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} PhotoAI. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link
                to="/privacy-policy"
                className={`text-sm transition-colors ${
                  currentPage === "privacy"
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className={`text-sm transition-colors ${
                  currentPage === "terms"
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalPageLayout;

