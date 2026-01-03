import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

export const FloatingLabelInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  rows = 4,
  required = false,
  className,
}: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isFloating = isFocused || hasValue;

  const inputClasses = cn(
    "w-full px-4 pt-6 pb-2 bg-neutral-900 border rounded-xl",
    "text-neutral-100 transition-all duration-200",
    "focus:outline-none",
    error
      ? "border-red-500 focus:border-red-400"
      : "border-neutral-800 focus:border-accent-500",
    error
      ? "focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
      : "focus:shadow-[0_0_0_3px_rgba(217,70,239,0.1)]",
    className,
  );

  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={rows}
          required={required}
          className={cn(inputClasses, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={inputClasses}
        />
      )}

      {/* Floating Label */}
      <motion.label
        htmlFor={id}
        className={cn(
          "absolute left-4 pointer-events-none transition-colors duration-200",
          error
            ? "text-red-400"
            : isFocused
              ? "text-accent-400"
              : "text-neutral-500",
        )}
        animate={{
          top: isFloating ? "0.5rem" : type === "textarea" ? "1rem" : "50%",
          fontSize: isFloating ? "0.75rem" : "1rem",
          y: isFloating ? 0 : type === "textarea" ? 0 : "-50%",
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
      >
        {label}
        {required && " *"}
      </motion.label>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-400 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FloatingLabelInput;
