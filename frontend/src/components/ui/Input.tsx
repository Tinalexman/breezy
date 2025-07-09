import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-light"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-dark-surface-light bg-dark-surface px-3 py-2 text-sm text-text-light placeholder:text-text-dim",
            "focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error-red focus:ring-error-red",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-error-red">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-text-dim">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
