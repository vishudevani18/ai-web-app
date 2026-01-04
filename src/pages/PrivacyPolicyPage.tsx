import { useState, useEffect } from "react";
import { getPrivacyPolicy, type LegalContent } from "@/lib/public-api";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalContentDisplay from "@/components/legal/LegalContent";
import { toast } from "sonner";

const PrivacyPolicyPage = () => {
  const [content, setContent] = useState<LegalContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPrivacyPolicy();
        setContent(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load Privacy Policy";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <LegalPageLayout currentPage="privacy">
      <LegalContentDisplay
        content={content}
        loading={loading}
        error={error}
        loadingText="Loading Privacy Policy..."
      />
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;

