import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompleteRegistrationFormProps {
  onSubmit: (data: RegistrationData) => void;
  onBackToLogin: () => void;
  loading?: boolean;
  phoneNumber?: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: {
    addressType: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  business: {
    businessName: string;
    businessType: string;
    businessSegment: string;
    businessDescription: string;
    gstNumber: string;
    websiteUrl: string;
    businessLogo: string;
  };
}

const STEPS = [
  { id: "ACCOUNT", label: "Account", description: "Account credentials" },
  { id: "PROFILE", label: "Profile", description: "Personal information" },
  { id: "ADDRESS", label: "Address", description: "Primary address (optional)" },
  { id: "BUSINESS", label: "Business", description: "Business details (optional)" },
];

const BUSINESS_TYPES = [
  { label: "Manufacturer", value: "manufacturer" },
  { label: "Reseller", value: "reseller" },
  { label: "Wholesaler", value: "wholesaler" },
  { label: "Other", value: "other" },
];

const BUSINESS_SEGMENTS = [
  { label: "Clothing", value: "clothing" },
  { label: "Accessories", value: "accessories" },
  { label: "Furniture", value: "furniture" },
  { label: "Electronics", value: "electronics" },
  { label: "Other", value: "other" },
];

const CompleteRegistrationForm = ({
  onSubmit,
  onBackToLogin,
  loading = false,
  phoneNumber = "",
}: CompleteRegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<RegistrationData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: {
      addressType: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "India",
    },
    business: {
      businessName: "",
      businessType: "",
      businessSegment: "",
      businessDescription: "",
      gstNumber: "",
      websiteUrl: "",
      businessLogo: "",
    },
  });

  const updateField = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof RegistrationData] as Record<string, string>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      // Account validation
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/.test(formData.password)) {
        newErrors.password = "Must include uppercase, lowercase, number, and special character";
      }
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 1) {
      // Profile validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
    }

    // Address and Business steps are optional, no validation required

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        onSubmit(formData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              index < currentStep
                ? "bg-primary text-primary-foreground"
                : index === currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={cn(
                "w-8 h-0.5 mx-1",
                index < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderAccountStep = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={errors.email ? "border-destructive" : ""}
          maxLength={150}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            className={cn("pr-10", errors.password ? "border-destructive" : "")}
            maxLength={18}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
        <p className="text-xs text-muted-foreground">
          8-18 characters with uppercase, lowercase, number, and special character
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.confirmPassword;
                  return newErrors;
                });
              }
            }}
            className={cn("pr-10", errors.confirmPassword ? "border-destructive" : "")}
            maxLength={18}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );

  const renderProfileStep = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          className={errors.firstName ? "border-destructive" : ""}
          maxLength={50}
        />
        {errors.firstName && (
          <p className="text-sm text-destructive">{errors.firstName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          className={errors.lastName ? "border-destructive" : ""}
          maxLength={50}
        />
        {errors.lastName && (
          <p className="text-sm text-destructive">{errors.lastName}</p>
        )}
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        This step is optional. You can skip it and complete later.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="addressType">Address Type</Label>
          <Input
            id="addressType"
            type="text"
            placeholder="Home / Office"
            value={formData.address.addressType}
            onChange={(e) => updateField("address.addressType", e.target.value)}
            maxLength={50}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipcode">PIN Code</Label>
          <Input
            id="zipcode"
            type="text"
            placeholder="400001"
            value={formData.address.zipcode}
            onChange={(e) => updateField("address.zipcode", e.target.value)}
            maxLength={20}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Street / Area</Label>
        <Input
          id="street"
          type="text"
          placeholder="Enter street address"
          value={formData.address.street}
          onChange={(e) => updateField("address.street", e.target.value)}
          maxLength={255}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            type="text"
            placeholder="Mumbai"
            value={formData.address.city}
            onChange={(e) => updateField("address.city", e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            type="text"
            placeholder="Maharashtra"
            value={formData.address.state}
            onChange={(e) => updateField("address.state", e.target.value)}
            maxLength={100}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          type="text"
          placeholder="India"
          value={formData.address.country}
          onChange={(e) => updateField("address.country", e.target.value)}
          maxLength={100}
        />
      </div>
    </div>
  );

  const renderBusinessStep = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        This step is optional. You can skip it and complete later.
      </p>

      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          type="text"
          placeholder="ABC Enterprises"
          value={formData.business.businessName}
          onChange={(e) => updateField("business.businessName", e.target.value)}
          maxLength={150}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Select
            value={formData.business.businessType}
            onValueChange={(value) => updateField("business.businessType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-background border">
              {BUSINESS_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessSegment">Business Segment</Label>
          <Select
            value={formData.business.businessSegment}
            onValueChange={(value) => updateField("business.businessSegment", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select segment" />
            </SelectTrigger>
            <SelectContent className="bg-background border">
              {BUSINESS_SEGMENTS.map((segment) => (
                <SelectItem key={segment.value} value={segment.value}>
                  {segment.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessDescription">Business Description</Label>
        <Textarea
          id="businessDescription"
          placeholder="Describe your business..."
          value={formData.business.businessDescription}
          onChange={(e) => updateField("business.businessDescription", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gstNumber">GST Number</Label>
        <Input
          id="gstNumber"
          type="text"
          placeholder="27ABCDE1234F1Z5"
          value={formData.business.gstNumber}
          onChange={(e) => updateField("business.gstNumber", e.target.value)}
          maxLength={20}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Website URL</Label>
        <Input
          id="websiteUrl"
          type="url"
          placeholder="https://www.example.com"
          value={formData.business.websiteUrl}
          onChange={(e) => updateField("business.websiteUrl", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessLogo">Business Logo URL</Label>
        <Input
          id="businessLogo"
          type="url"
          placeholder="https://www.example.com/logo.png"
          value={formData.business.businessLogo}
          onChange={(e) => updateField("business.businessLogo", e.target.value)}
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderAccountStep();
      case 1:
        return renderProfileStep();
      case 2:
        return renderAddressStep();
      case 3:
        return renderBusinessStep();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderStepIndicator()}

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {STEPS[currentStep].label}
        </h3>
        <p className="text-sm text-muted-foreground">
          {STEPS[currentStep].description}
        </p>
      </div>

      {renderCurrentStep()}

      <div className="flex gap-3 pt-4">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1"
            disabled={loading}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}

        <Button
          type="button"
          onClick={handleNext}
          className="flex-1"
          disabled={loading}
        >
          {loading ? (
            "Processing..."
          ) : currentStep === STEPS.length - 1 ? (
            <>
              Complete Registration
              <Check className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              {currentStep >= 2 ? "Skip & Continue" : "Continue"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-sm text-primary hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default CompleteRegistrationForm;
