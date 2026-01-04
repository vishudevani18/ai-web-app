import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import AuthLogo from "./AuthLogo";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  compact?: boolean; // For complete-registration which needs more space
}

const AuthLayout = ({ title, subtitle, children, compact = false }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/15 to-primary/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Auth Card */}
        <div
          className={cn(
            "bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-3xl shadow-2xl relative overflow-hidden",
            compact
              ? "p-4 sm:p-6 lg:p-8 max-h-[95vh] lg:max-h-none overflow-y-auto lg:overflow-visible"
              : "p-6 sm:p-8 lg:p-10"
          )}
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary/10 rounded-full blur-2xl" />

          {/* Logo */}
          <div
            className={cn(
              compact ? "mb-3 sm:mb-4" : title === "Welcome Back" ? "mb-4 sm:mb-5" : "mb-4 sm:mb-6"
            )}
          >
            <AuthLogo />
          </div>

          {/* Title */}
          <div
            className={cn(
              compact
                ? "text-center mb-3 sm:mb-4"
                : title === "Welcome Back"
                ? "text-center mb-4 sm:mb-5"
                : "text-center mb-4 sm:mb-6"
            )}
          >
            <h1
              className={cn(
                title === "Welcome Back"
                  ? "text-2xl lg:text-3xl font-black text-foreground mb-0"
                  : compact
                  ? "text-xl sm:text-2xl font-black text-foreground mb-1"
                  : "text-2xl lg:text-3xl font-black text-foreground mb-2"
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  "text-muted-foreground text-sm",
                  compact && "text-xs sm:text-sm"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

