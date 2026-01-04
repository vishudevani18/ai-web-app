import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LegalContent } from "@/lib/public-api";

interface LegalContentProps {
  content: LegalContent | null;
  loading: boolean;
  error: string | null;
  loadingText: string;
}

const LegalContentDisplay = ({ content, loading, error, loadingText }: LegalContentProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">{loadingText}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <div className="bg-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-border">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-foreground">
          {content.title}
        </h1>

        {content.lastUpdated && (
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
            Last updated:{" "}
            {new Date(content.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        <div
          className="text-foreground/90 leading-relaxed space-y-4 sm:space-y-6 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </article>
  );
};

export default LegalContentDisplay;

