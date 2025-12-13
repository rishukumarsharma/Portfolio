import { forwardRef, type HTMLAttributes, type ElementType } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

// Base typography props
interface BaseTypographyProps {
    /** Additional CSS classes */
    className?: string;
    /** Enable gradient text effect */
    gradient?: boolean;
    /** Custom gradient colors */
    gradientColors?: { from: string; to: string };
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Font weight override */
    weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    /** Animate on mount */
    animate?: boolean;
    /** Animation delay */
    animationDelay?: number;
}

// Weight classes
const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
};

// Alignment classes
const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
};

// Gradient text styles
const getGradientStyles = (colors?: { from: string; to: string }) => {
    const from = colors?.from || 'var(--color-accent-400)';
    const to = colors?.to || 'var(--color-accent-600)';
    return {
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    };
};

// Animation variants
const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
        }
    },
};

// =============================================================================
// H1 Component - Display heading
// =============================================================================

export interface H1Props extends BaseTypographyProps, Omit<HTMLAttributes<HTMLHeadingElement>, 'className'> {
    as?: 'h1' | 'h2' | 'h3';
}

export const H1 = forwardRef<HTMLHeadingElement, H1Props>(
    (
        {
            children,
            className,
            gradient = false,
            gradientColors,
            align,
            weight = 'bold',
            animate = false,
            animationDelay = 0,
            as: Tag = 'h1',
            ...props
        },
        ref
    ) => {
        const baseStyles = cn(
            'font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
            'leading-[1.1] tracking-tight',
            'text-neutral-50 dark:text-neutral-50',
            weightClasses[weight],
            align && alignClasses[align],
            className
        );

        if (animate) {
            return (
                <motion.h1
                    ref={ref as React.Ref<HTMLHeadingElement>}
                    className={baseStyles}
                    style={gradient ? getGradientStyles(gradientColors) : undefined}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: animationDelay }}
                    {...(props as HTMLMotionProps<'h1'>)}
                >
                    {children}
                </motion.h1>
            );
        }

        return (
            <Tag
                ref={ref}
                className={baseStyles}
                style={gradient ? getGradientStyles(gradientColors) : undefined}
                {...props}
            >
                {children}
            </Tag>
        );
    }
);

H1.displayName = 'H1';

// =============================================================================
// H2 Component - Section heading
// =============================================================================

export interface H2Props extends BaseTypographyProps, Omit<HTMLAttributes<HTMLHeadingElement>, 'className'> {
    as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export const H2 = forwardRef<HTMLHeadingElement, H2Props>(
    (
        {
            children,
            className,
            gradient = false,
            gradientColors,
            align,
            weight = 'bold',
            animate = false,
            animationDelay = 0,
            as: Tag = 'h2',
            ...props
        },
        ref
    ) => {
        const baseStyles = cn(
            'font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
            'leading-[1.2] tracking-tight',
            'text-neutral-50 dark:text-neutral-50',
            weightClasses[weight],
            align && alignClasses[align],
            className
        );

        if (animate) {
            return (
                <motion.h2
                    ref={ref as React.Ref<HTMLHeadingElement>}
                    className={baseStyles}
                    style={gradient ? getGradientStyles(gradientColors) : undefined}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: animationDelay }}
                    {...(props as HTMLMotionProps<'h2'>)}
                >
                    {children}
                </motion.h2>
            );
        }

        return (
            <Tag
                ref={ref}
                className={baseStyles}
                style={gradient ? getGradientStyles(gradientColors) : undefined}
                {...props}
            >
                {children}
            </Tag>
        );
    }
);

H2.displayName = 'H2';

// =============================================================================
// H3 Component - Subsection heading
// =============================================================================

export interface H3Props extends BaseTypographyProps, Omit<HTMLAttributes<HTMLHeadingElement>, 'className'> {
    as?: 'h2' | 'h3' | 'h4' | 'h5';
}

export const H3 = forwardRef<HTMLHeadingElement, H3Props>(
    (
        {
            children,
            className,
            gradient = false,
            gradientColors,
            align,
            weight = 'semibold',
            animate = false,
            animationDelay = 0,
            as: Tag = 'h3',
            ...props
        },
        ref
    ) => {
        const baseStyles = cn(
            'text-xl sm:text-2xl md:text-3xl',
            'leading-[1.3] tracking-tight',
            'text-neutral-100 dark:text-neutral-100',
            weightClasses[weight],
            align && alignClasses[align],
            className
        );

        if (animate) {
            return (
                <motion.h3
                    ref={ref as React.Ref<HTMLHeadingElement>}
                    className={baseStyles}
                    style={gradient ? getGradientStyles(gradientColors) : undefined}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: animationDelay }}
                    {...(props as HTMLMotionProps<'h3'>)}
                >
                    {children}
                </motion.h3>
            );
        }

        return (
            <Tag
                ref={ref}
                className={baseStyles}
                style={gradient ? getGradientStyles(gradientColors) : undefined}
                {...props}
            >
                {children}
            </Tag>
        );
    }
);

H3.displayName = 'H3';

// =============================================================================
// Body Component - Paragraph text
// =============================================================================

export type BodySize = 'sm' | 'md' | 'lg';

export interface BodyProps extends BaseTypographyProps, Omit<HTMLAttributes<HTMLParagraphElement>, 'className'> {
    /** Text size variant */
    size?: BodySize;
    /** Muted/secondary color */
    muted?: boolean;
    /** Maximum width for readability */
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

const bodySizeStyles: Record<BodySize, string> = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
};

const maxWidthStyles = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
    none: '',
};

export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
    (
        {
            children,
            className,
            size = 'md',
            muted = false,
            gradient = false,
            gradientColors,
            align,
            weight = 'normal',
            maxWidth = 'none',
            animate = false,
            animationDelay = 0,
            ...props
        },
        ref
    ) => {
        const baseStyles = cn(
            bodySizeStyles[size],
            muted ? 'text-neutral-400 dark:text-neutral-400' : 'text-neutral-300 dark:text-neutral-300',
            weightClasses[weight],
            align && alignClasses[align],
            maxWidthStyles[maxWidth],
            className
        );

        if (animate) {
            return (
                <motion.p
                    ref={ref as React.Ref<HTMLParagraphElement>}
                    className={baseStyles}
                    style={gradient ? getGradientStyles(gradientColors) : undefined}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: animationDelay }}
                    {...(props as HTMLMotionProps<'p'>)}
                >
                    {children}
                </motion.p>
            );
        }

        return (
            <p
                ref={ref}
                className={baseStyles}
                style={gradient ? getGradientStyles(gradientColors) : undefined}
                {...props}
            >
                {children}
            </p>
        );
    }
);

Body.displayName = 'Body';

// =============================================================================
// Caption Component - Small helper text
// =============================================================================

export type CaptionSize = 'sm' | 'md' | 'lg';

export interface CaptionProps extends BaseTypographyProps, Omit<HTMLAttributes<HTMLSpanElement>, 'className'> {
    /** Caption size */
    size?: CaptionSize;
    /** Use as label (uppercase) */
    label?: boolean;
    /** Accent color */
    accent?: boolean;
}

const captionSizeStyles: Record<CaptionSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};

export const Caption = forwardRef<HTMLSpanElement, CaptionProps>(
    (
        {
            children,
            className,
            size = 'md',
            label = false,
            accent = false,
            gradient = false,
            gradientColors,
            align,
            weight = 'medium',
            animate = false,
            animationDelay = 0,
            ...props
        },
        ref
    ) => {
        const baseStyles = cn(
            captionSizeStyles[size],
            'leading-normal',
            label && 'uppercase tracking-wider',
            accent
                ? 'text-accent-400 dark:text-accent-400'
                : 'text-neutral-500 dark:text-neutral-500',
            weightClasses[weight],
            align && alignClasses[align],
            className
        );

        if (animate) {
            return (
                <motion.span
                    ref={ref as React.Ref<HTMLSpanElement>}
                    className={baseStyles}
                    style={gradient ? getGradientStyles(gradientColors) : undefined}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: animationDelay }}
                    {...(props as HTMLMotionProps<'span'>)}
                >
                    {children}
                </motion.span>
            );
        }

        return (
            <span
                ref={ref}
                className={baseStyles}
                style={gradient ? getGradientStyles(gradientColors) : undefined}
                {...props}
            >
                {children}
            </span>
        );
    }
);

Caption.displayName = 'Caption';

// =============================================================================
// Text Component - Generic text with polymorphic 'as' prop
// =============================================================================

export interface TextProps<T extends ElementType = 'span'> extends BaseTypographyProps {
    as?: T;
    children?: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    muted?: boolean;
}

const textSizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
};

export const Text = <T extends ElementType = 'span'>({
    as,
    children,
    className,
    size = 'md',
    muted = false,
    gradient = false,
    gradientColors,
    align,
    weight = 'normal',
}: TextProps<T>) => {
    const Component = as || 'span';

    const baseStyles = cn(
        textSizeStyles[size],
        'leading-normal',
        muted ? 'text-neutral-400' : 'text-neutral-200',
        weightClasses[weight],
        align && alignClasses[align],
        className
    );

    return (
        <Component
            className={baseStyles}
            style={gradient ? getGradientStyles(gradientColors) : undefined}
        >
            {children}
        </Component>
    );
};

Text.displayName = 'Text';

// Export all typography components
export const Typography = {
    H1,
    H2,
    H3,
    Body,
    Caption,
    Text,
};

export default Typography;
