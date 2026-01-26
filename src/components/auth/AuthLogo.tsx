import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const AuthLogo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link 
        to="/" 
        className="inline-block group cursor-pointer transition-transform hover:scale-105 active:scale-95 mb-2 sm:mb-3"
      >
        <Logo variant="horizontal" size="md" className="group-hover:opacity-80 transition-opacity" />
      </Link>
      <div className="flex items-center gap-1 pointer-events-none">
        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
        <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">AI-Powered E-Commerce Studio</span>
      </div>
    </div>
  );
};

export default AuthLogo;
