import { useState, useEffect } from "react";
import { getTermsOfService, type LegalContent } from "@/lib/public-api";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalContentDisplay from "@/components/legal/LegalContent";
import { toast } from "sonner";

const TermsOfServicePage = () => {
  const [content, setContent] = useState<LegalContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTermsOfService();
        setContent(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load Terms of Service";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <LegalPageLayout currentPage="terms">
      <LegalContentDisplay
        content={content}
        loading={loading}
        error={error}
        loadingText="Loading Terms of Service..."
      />
    </LegalPageLayout>
  );
};

export default TermsOfServicePage;

