import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label:  string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-white/80"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full min-h-[44px] px-4 py-3 rounded-lg border text-base text-white",
            "bg-[#0B0907] placeholder:text-white/40",
            "focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-red-500/60" : "border-white/[0.08]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
