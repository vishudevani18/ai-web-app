import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  error,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const digits = value.split("").concat(Array(length - value.length).fill(""));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return;

    const newValue = digits.slice(0, index).join("") + digit + digits.slice(index + 1).join("");
    onChange(newValue.slice(0, length));

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pastedData);
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
        {digits.slice(0, length).map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(-1)}
            onPaste={handlePaste}
            className={cn(
              "w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-semibold rounded-lg sm:rounded-xl border-2 bg-card",
              "transition-all duration-200 outline-none",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              focusedIndex === index ? "border-primary" : "border-border",
              error ? "border-destructive" : ""
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-xs sm:text-sm text-destructive text-center px-2">{error}</p>
      )}
    </div>
  );
};

export default OTPInput;
