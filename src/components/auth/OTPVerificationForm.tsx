import React, { useState, useEffect } from "react";
import OTPInput from "./OTPInput";
import AuthButton from "./AuthButton";
import { X } from "lucide-react";

interface OTPVerificationFormProps {
  phone: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onClose: () => void;
  onBackToLogin: () => void;
  loading?: boolean;
  title?: string;
  subtitle?: string;
}

const OTPVerificationForm: React.FC<OTPVerificationFormProps> = ({
  phone,
  onVerify,
  onResend,
  onClose,
  onBackToLogin,
  loading,
  title = "Verify OTP",
  subtitle = "Reset your password to secure your account",
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

  const handleResend = () => {
    setResendTimer(60);
    setCanResend(false);
    setOtp("");
    onResend();
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-primary">Enter OTP</h3>
        <p className="text-sm text-muted-foreground">
          Enter OTP sent to <span className="font-semibold text-foreground">+91 {phone}</span>
        </p>
      </div>

      <OTPInput
        value={otp}
        onChange={setOtp}
        error={error}
      />

      <AuthButton onClick={handleVerify} loading={loading}>
        Verify OTP
      </AuthButton>

      <div className="text-center">
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-primary hover:underline font-medium text-sm"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Resend OTP in {resendTimer}s
          </p>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
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
