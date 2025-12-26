import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

interface ResetPasswordFormProps {
  onSubmit: (password: string) => void;
  onBackToLogin: () => void;
  loading?: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  onBackToLogin,
  loading,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const validate = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          New Password <span className="text-destructive">*</span>
        </label>
        <AuthInput
          icon="lock"
          showPasswordToggle
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Confirm New Password <span className="text-destructive">*</span>
        </label>
        <AuthInput
          icon="lock"
          showPasswordToggle
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
      </div>

      <AuthButton type="submit" loading={loading}>
        Reset Password
      </AuthButton>

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
    </form>
  );
};

export default ResetPasswordForm;
