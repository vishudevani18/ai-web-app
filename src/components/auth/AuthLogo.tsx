import { Camera, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLogo = () => {
  return (
    <Link 
      to="/" 
      className="flex flex-col items-center justify-center group cursor-pointer transition-transform hover:scale-105 active:scale-95"
    >
      <div className="relative inline-flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative p-2 sm:p-3 bg-gradient-primary rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
            <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">PhotoAI</span>
          <div className="flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">AI-Powered E-Commerce Studio</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuthLogo;
