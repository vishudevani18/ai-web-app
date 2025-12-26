import React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  showArrow?: boolean;
}

const AuthButton = React.forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ className, children, loading, showArrow = true, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "w-full py-3.5 px-6 rounded-xl font-semibold text-base",
          "bg-primary text-primary-foreground",
          "flex items-center justify-center gap-2",
          "transition-all duration-200",
          "hover:opacity-90 active:scale-[0.98]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {children}
            {showArrow && <ArrowRight className="w-5 h-5" />}
          </>
        )}
      </button>
    );
  }
);

AuthButton.displayName = "AuthButton";

export default AuthButton;
