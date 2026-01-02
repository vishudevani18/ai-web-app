import { Camera, Sparkles } from "lucide-react";

const AuthLogo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-50" />
          <div className="relative p-3 bg-gradient-primary rounded-2xl shadow-lg">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-foreground tracking-tight">PhotoAI</span>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">AI-Powered E-Commerce Studio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogo;
