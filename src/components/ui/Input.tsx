import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const baseInputStyles = `
      w-full py-3 text-base text-neutral-100
      bg-transparent
      border rounded-lg
      outline-none
      transition-all duration-200
      placeholder:text-neutral-500
    `;

    const variantStyles = {
      default: `
        border-neutral-700
        focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20
      `,
      filled: `
        bg-neutral-800/50 border-transparent
        focus:bg-neutral-800 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20
      `,
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              "block text-sm font-medium mb-2 transition-colors duration-200",
              focused ? "text-accent-400" : "text-neutral-300",
              error && "text-error-400",
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={twMerge(
              clsx(
                baseInputStyles,
                variantStyles[variant],
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                !leftIcon && "px-4",
                error &&
                  "border-error-500 focus:border-error-500 focus:ring-error-500/20",
                className,
              ),
            )}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </span>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={clsx(
              "mt-1.5 text-sm",
              error ? "text-error-400" : "text-neutral-500",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className={clsx(
              "block text-sm font-medium mb-2 transition-colors duration-200",
              focused ? "text-accent-400" : "text-neutral-300",
              error && "text-error-400",
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={twMerge(
            clsx(
              `
                w-full px-4 py-3 text-base text-neutral-100
                bg-transparent border border-neutral-700 rounded-lg
                outline-none resize-none
                transition-all duration-200
                placeholder:text-neutral-500
                focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20
              `,
              error &&
                "border-error-500 focus:border-error-500 focus:ring-error-500/20",
              className,
            ),
          )}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={clsx(
              "mt-1.5 text-sm",
              error ? "text-error-400" : "text-neutral-500",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Input;
