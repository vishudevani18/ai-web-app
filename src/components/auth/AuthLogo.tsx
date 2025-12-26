import { Camera } from "lucide-react";

const AuthLogo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Camera className="w-10 h-10 text-primary" />
      </div>
    </div>
  );
};

export default AuthLogo;
