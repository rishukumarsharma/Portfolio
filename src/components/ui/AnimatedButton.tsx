import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export type AnimatedButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "glow";
export type AnimatedButtonSize = "sm" | "md" | "lg" | "xl";

export interface AnimatedButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  children: ReactNode;
  variant?: AnimatedButtonVariant;
  size?: AnimatedButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  magnetic?: boolean;
  className?: string;
}

const variantStyles: Record<AnimatedButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-accent-500 to-accent-600 
    text-white 
    shadow-lg shadow-accent-500/25
    hover:shadow-xl hover:shadow-accent-500/30
    dark:from-accent-400 dark:to-accent-500
  `,
  secondary: `
    bg-neutral-800 
    text-neutral-100 
    border border-neutral-700
    hover:bg-neutral-700 hover:border-neutral-600
    dark:bg-neutral-800 dark:border-neutral-700
  `,
  ghost: `
    bg-transparent 
    text-neutral-300 
    hover:bg-neutral-800/50 hover:text-neutral-100
    dark:hover:bg-neutral-800/70
  `,
  outline: `
    bg-transparent 
    text-accent-400 
    border border-accent-500/50
    hover:bg-accent-500/10 hover:border-accent-400
    dark:border-accent-400/50 dark:hover:border-accent-400
  `,
  glow: `
    bg-accent-500 
    text-white
    shadow-[0_0_20px_rgba(217,70,239,0.5)]
    hover:shadow-[0_0_30px_rgba(217,70,239,0.7)]
    dark:shadow-[0_0_25px_rgba(217,70,239,0.6)]
  `,
};

const sizeStyles: Record<AnimatedButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-md",
  md: "px-5 py-2.5 text-sm gap-2 rounded-lg",
  lg: "px-7 py-3.5 text-base gap-2.5 rounded-lg",
  xl: "px-9 py-4 text-lg gap-3 rounded-xl",
};

// Animation variants
const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

const iconVariants = {
  initial: { x: 0 },
  hover: { x: 3 },
};

const LoadingSpinner = () => (
  <motion.svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </motion.svg>
);

export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      // Note: magnetic prop is accepted but not yet implemented
      ...props
    },
    ref,
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium
      transition-colors duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    `;

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className,
        )}
        variants={buttonVariants}
        initial="initial"
        whileHover={!disabled && !isLoading ? "hover" : undefined}
        whileTap={!disabled && !isLoading ? "tap" : undefined}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          leftIcon && (
            <motion.span variants={iconVariants} className="shrink-0">
              {leftIcon}
            </motion.span>
          )
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <motion.span variants={iconVariants} className="shrink-0">
            {rightIcon}
          </motion.span>
        )}
      </motion.button>
    );
  },
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
