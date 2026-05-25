import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?:    "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210]",
          "min-h-[44px] min-w-[44px]",
          // Variants
          variant === "primary" && [
            "bg-orange text-white focus-visible:ring-orange",
            "hover:bg-orange-dark active:bg-orange-dark",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          ],
          variant === "secondary" && [
            "bg-[#141210] text-white border border-white/[0.08]",
            "hover:border-white/[0.14] active:border-white/[0.14]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          ],
          variant === "ghost" && [
            "text-orange bg-transparent",
            "hover:bg-orange/10 active:bg-orange/10",
          ],
          // Sizes
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg w-full",
          className
        )}
        style={variant === "primary" ? { boxShadow: "0 8px 30px -8px rgba(255,122,0,0.6)" } : undefined}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            {children}
          </span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
