import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

interface SignUpFormProps {
  onSubmit: (phone: string) => void;
  onLogin: () => void;
  loading?: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  onLogin,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Mobile Number <span className="text-destructive">*</span>
        </label>
        <AuthInput
          icon="phone"
          type="tel"
          placeholder="9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          error={error}
        />
        <p className="text-xs text-muted-foreground">
          OTP will be sent via WhatsApp
        </p>
      </div>

      <AuthButton type="submit" loading={loading}>
        Send OTP via WhatsApp
      </AuthButton>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="text-primary hover:underline font-medium"
        >
          Log In
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;
