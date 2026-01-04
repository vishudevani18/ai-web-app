import React, { useState, useEffect } from "react";
import OTPInput from "./OTPInput";
import AuthButton from "./AuthButton";

interface OTPVerificationFormProps {
  phone: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onClose: () => void;
  onBackToLogin: () => void;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  otpContext?: "signup" | "forgot-password";
}

const OTPVerificationForm: React.FC<OTPVerificationFormProps> = ({
  phone,
  onVerify,
  onResend,
  onClose,
  onBackToLogin,
  loading,
  title = "Verify OTP",
  subtitle,
  otpContext = "signup",
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setError("");
    onVerify(otp);
  };

  const isOtpValid = otp.length === 6;

  const handleResend = () => {
    setResendTimer(60);
    setCanResend(false);
    setOtp("");
    onResend();
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      <div className="text-center space-y-1.5 sm:space-y-2 mb-2 sm:mb-3 md:mb-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">Enter OTP</h3>
        <p className="text-xs sm:text-sm text-muted-foreground px-1 sm:px-2">
          Enter OTP sent to <span className="font-semibold text-foreground break-all">+91 {phone}</span>
        </p>
      </div>

      <OTPInput
        value={otp}
        onChange={setOtp}
        error={error}
      />

      <AuthButton 
        onClick={handleVerify} 
        loading={loading} 
        disabled={!isOtpValid || loading}
        className="w-full text-sm sm:text-base py-3 sm:py-4"
      >
        Verify OTP
      </AuthButton>

      <div className="text-center">
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-primary hover:underline font-medium text-xs sm:text-sm"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground">
            Resend OTP in {resendTimer}s
          </p>
        )}
      </div>

      <p className="text-center text-xs sm:text-sm text-muted-foreground px-1">
        Remember your password?{" "}
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-primary hover:underline font-medium"
        >
          Back to Login
        </button>
      </p>
    </div>
  );
};

export default OTPVerificationForm;
