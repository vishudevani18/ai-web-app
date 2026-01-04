import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

interface ForgotPasswordFormProps {
  onSubmit: (phone: string) => void;
  onBackToLogin: () => void;
  loading?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onBackToLogin,
  loading,
}) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!phone.trim()) {
      setError("Mobile number is required");
      return false;
    }
    if (phone.length < 10) {
      setError("Enter a valid mobile number");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(phone);
    }
  };

  const isPhoneValid = phone.length === 10 && /^\d{10}$/.test(phone);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
          Mobile Number
          <span className="text-destructive">*</span>
        </label>
        <AuthInput
          icon="phone"
          type="tel"
          placeholder="9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          error={error}
        />
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2">
          <span className="w-1 h-1 bg-primary rounded-full"></span>
          Enter your registered mobile number to reset password
        </p>
      </div>

      <AuthButton type="submit" loading={loading} disabled={!isPhoneValid || loading}>
        Send OTP
      </AuthButton>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-primary hover:text-primary/80 font-bold transition-colors"
        >
          Back to Sign In
        </button>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
