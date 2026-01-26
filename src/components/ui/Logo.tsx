import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "icon" | "text" | "horizontal" | "vertical";
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "light" | "dark";
  className?: string;
}

const sizeClasses = {
  sm: {
    icon: "w-10 h-10 sm:w-12 sm:h-12",
    text: "h-10 sm:h-12 min-h-[40px] w-auto max-w-[140px] sm:max-w-[160px]",
    horizontal: "h-10 sm:h-12 min-h-[40px]",
    vertical: "h-16 sm:h-18 min-h-[64px] min-w-[80px] max-w-[100px] sm:max-w-[120px]",
    container: "gap-2 sm:gap-2.5"
  },
  md: {
    icon: "w-12 h-12 sm:w-14 sm:h-14",
    text: "h-12 sm:h-14 min-h-[48px] w-auto max-w-[180px] sm:max-w-[200px]",
    horizontal: "h-12 sm:h-14 min-h-[48px]",
    vertical: "h-24 sm:h-28 min-h-[100px] min-w-[120px] max-w-[160px] sm:max-w-[180px]",
    container: "gap-2.5 sm:gap-3"
  },
  lg: {
    icon: "w-16 h-16 sm:w-20 sm:h-20",
    text: "h-16 sm:h-20 min-h-[64px] w-auto max-w-[240px] sm:max-w-[280px]",
    horizontal: "h-16 sm:h-20 min-h-[64px]",
    vertical: "h-28 sm:h-32 min-h-[120px] min-w-[140px] max-w-[200px] sm:max-w-[220px]",
    container: "gap-3 sm:gap-4"
  },
  xl: {
    icon: "w-20 h-20 sm:w-24 sm:h-24",
    text: "h-20 sm:h-24 min-h-[80px] w-auto max-w-[300px] sm:max-w-[360px]",
    horizontal: "h-20 sm:h-24 min-h-[80px]",
    vertical: "h-32 sm:h-36 min-h-[128px] min-w-[140px] max-w-[220px] sm:max-w-[260px]",
    container: "gap-4 sm:gap-5"
  }
};

const Logo = ({ variant = "horizontal", size = "md", theme = "light", className }: LogoProps) => {
  const sizes = sizeClasses[size];
  const isVertical = variant === "vertical";
  const isIconOnly = variant === "icon";
  const isTextOnly = variant === "text";
  const iconSrc = theme === "dark" ? "/logo-dark.png" : "/logo.png";
  const textSrc = theme === "dark" ? "/logo-text-dark.png" : "/logo-text.png";

  if (isIconOnly) {
    return (
      <img
        src={iconSrc}
        alt="GarmentoAI Icon"
        className={cn(sizes.icon, "object-contain flex-shrink-0", className)}
      />
    );
  }

  if (isTextOnly) {
    // For text-only, use text logo (dark or light based on theme)
    return (
      <img
        src={textSrc}
        alt="GarmentoAI"
        className={cn(
          sizes.text,
          "w-auto object-contain",
          "transition-all duration-200",
          "drop-shadow-sm",
          "flex-shrink-0",
          className
        )}
      />
    );
  }

  // Horizontal: display logo and logo-text side by side
  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "flex items-center",
          sizes.container,
          sizes.horizontal,
          "flex-shrink-0",
          className
        )}
      >
        <img
          src={iconSrc}
          alt="GarmentoAI Icon"
          className={cn(sizes.icon, "object-contain flex-shrink-0")}
        />
        <img
          src={textSrc}
          alt="GarmentoAI"
          className={cn(
            sizes.text,
            "w-auto object-contain",
            "transition-all duration-200",
            "drop-shadow-sm",
            "flex-shrink-0"
          )}
        />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <img
        src="/logo-vertical.png"
        alt="GarmentoAI"
        className={cn(
          sizes.vertical,
          "w-auto object-contain",
          "transition-all duration-200",
          "drop-shadow-sm",
          "flex-shrink-0",
          className
        )}
        style={{
          minWidth: "120px",
          minHeight: "100px"
        }}
      />
    );
  }

  // Fallback: use icon only
  return (
    <img
      src={iconSrc}
      alt="GarmentoAI Icon"
      className={cn(sizes.icon, "object-contain flex-shrink-0", className)}
    />
  );
};

export default Logo;
