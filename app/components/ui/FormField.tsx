"use client";

import { forwardRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  as?: "input" | "textarea";
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, as = "input", className = "", ...props }, ref) => {
    const baseClasses = [
      "w-full bg-transparent border border-terminal-border rounded px-3 py-2.5 min-h-[44px]",
      "text-gray-300 font-mono text-sm placeholder:text-gray-500",
      "outline-none transition-shadow duration-200",
      "focus:shadow-terminal-glow focus:border-terminal-glow",
      error ? "border-red-500/60" : "",
      className,
    ].join(" ");

    return (
      <div className="space-y-1">
        <label className="block text-terminal-glow text-sm font-mono">
          <span className="text-gray-400">$</span> {label}
        </label>
        {as === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${baseClasses} min-h-[120px] resize-y`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={baseClasses}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && (
          <p className="text-red-400 text-xs font-mono">
            Error: {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
