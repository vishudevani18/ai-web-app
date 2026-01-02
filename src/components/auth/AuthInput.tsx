import React, { useState } from "react";
import { Eye, EyeOff, Mail, Phone, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: "email" | "phone" | "lock" | "user";
  showPasswordToggle?: boolean;
  error?: string;
}

const iconMap = {
  email: Mail,
  phone: Phone,
  lock: Lock,
  user: User,
};

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, icon, showPasswordToggle, type, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const Icon = icon ? iconMap[icon] : null;

    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="relative">
        <div
          className={cn(
            "flex items-center border-2 rounded-xl bg-background transition-all duration-300",
            "focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary shadow-sm",
            error ? "border-destructive focus-within:ring-destructive/30" : "border-border/50 hover:border-primary/50",
            className
          )}
        >
          {Icon && (
            <div className="pl-4 pr-2 text-primary">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "flex-1 py-3.5 px-4 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none",
              "text-base font-medium"
            )}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="pr-4 pl-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive mt-2 ml-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
