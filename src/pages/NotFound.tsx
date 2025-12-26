import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-2xl mx-auto px-6 animate-fade-in">
        <div className="mb-8">
          <div className="text-9xl font-bold text-[hsl(var(--orange-accent))] mb-4">404</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Page Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="hero"
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
