import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <>
      <style>{`
        [data-sonner-toaster] {
          --success-bg: rgb(240 253 244);
          --success-text: rgb(20 83 45);
          --success-border: rgb(187 247 208);
          --error-bg: rgb(254 242 242);
          --error-text: rgb(153 27 27);
          --error-border: rgb(252 165 165);
          --info-bg: rgb(239 246 255);
          --info-text: rgb(30 64 175);
          --info-border: rgb(147 197 253);
          --warning-bg: rgb(254 252 232);
          --warning-text: rgb(113 63 18);
          --warning-border: rgb(253 230 138);
        }
        
        [data-theme="dark"] [data-sonner-toaster],
        .dark [data-sonner-toaster] {
          --success-bg: rgb(20 83 45);
          --success-text: rgb(220 252 231);
          --success-border: rgb(34 197 94);
          --error-bg: rgb(127 29 29);
          --error-text: rgb(254 226 226);
          --error-border: rgb(239 68 68);
          --info-bg: rgb(30 64 175);
          --info-text: rgb(219 234 254);
          --info-border: rgb(59 130 246);
          --warning-bg: rgb(113 63 18);
          --warning-text: rgb(254 243 199);
          --warning-border: rgb(251 191 36);
        }

        [data-sonner-toast][data-type="success"] {
          background: var(--success-bg) !important;
          color: var(--success-text) !important;
          border-color: var(--success-border) !important;
        }

        [data-sonner-toast][data-type="error"] {
          background: var(--error-bg) !important;
          color: var(--error-text) !important;
          border-color: var(--error-border) !important;
        }

        [data-sonner-toast][data-type="info"] {
          background: var(--info-bg) !important;
          color: var(--info-text) !important;
          border-color: var(--info-border) !important;
        }

        [data-sonner-toast][data-type="warning"] {
          background: var(--warning-bg) !important;
          color: var(--warning-text) !important;
          border-color: var(--warning-border) !important;
        }

        [data-sonner-toast] {
          border-radius: 0.75rem !important;
          padding: 1rem !important;
          min-width: 320px !important;
          max-width: 420px !important;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
          font-weight: 500 !important;
        }

        [data-sonner-toast] [data-description] {
          font-size: 0.875rem !important;
          margin-top: 0.25rem !important;
          opacity: 0.9 !important;
        }
      `}</style>
      <Sonner
        theme={theme as ToasterProps["theme"]}
        position="top-right"
        className="toaster group"
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground group-[.toast]:text-sm",
            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:hover:opacity-90",
            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:hover:opacity-90",
          },
        }}
        closeButton
        expand={true}
        duration={4000}
        {...props}
      />
    </>
  );
};

export { Toaster, toast };
