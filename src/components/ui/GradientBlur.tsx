import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export type GradientBlurPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'center'
    | 'top-center'
    | 'bottom-center';

export type GradientBlurSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface GradientBlurProps {
    /** Primary color (CSS color value) */
    color?: string;
    /** Secondary color for gradient (optional) */
    secondaryColor?: string;
    /** Position of the blur */
    position?: GradientBlurPosition;
    /** Size of the blur orb */
    size?: GradientBlurSize;
    /** Opacity of the blur (0-100) */
    opacity?: number;
    /** Blur amount in pixels */
    blur?: number;
    /** Enable floating animation */
    animate?: boolean;
    /** Animation duration in seconds */
    animationDuration?: number;
    /** Additional CSS classes */
    className?: string;
    /** Z-index value */
    zIndex?: number;
}

const positionStyles: Record<GradientBlurPosition, string> = {
    'top-left': '-top-1/4 -left-1/4',
    'top-right': '-top-1/4 -right-1/4',
    'bottom-left': '-bottom-1/4 -left-1/4',
    'bottom-right': '-bottom-1/4 -right-1/4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-center': '-top-1/4 left-1/2 -translate-x-1/2',
    'bottom-center': '-bottom-1/4 left-1/2 -translate-x-1/2',
};

const sizeStyles: Record<GradientBlurSize, string> = {
    sm: 'w-[200px] h-[200px]',
    md: 'w-[400px] h-[400px]',
    lg: 'w-[600px] h-[600px]',
    xl: 'w-[800px] h-[800px]',
    '2xl': 'w-[1000px] h-[1000px]',
};

export const GradientBlur = ({
    color = '#d946ef',
    secondaryColor,
    position = 'top-left',
    size = 'lg',
    opacity = 20,
    blur = 120,
    animate = true,
    animationDuration = 20,
    className,
    zIndex = 0,
}: GradientBlurProps) => {
    const gradientStyle = secondaryColor
        ? `radial-gradient(circle, ${color}, ${secondaryColor})`
        : color;

    return (
        <motion.div
            className={cn(
                'absolute rounded-full pointer-events-none',
                positionStyles[position],
                sizeStyles[size],
                className
            )}
            style={{
                background: gradientStyle,
                opacity: opacity / 100,
                filter: `blur(${blur}px)`,
                zIndex,
            }}
            animate={animate ? {
                x: [0, 30, -20, 0],
                y: [0, -20, 30, 0],
                scale: [1, 1.05, 0.95, 1],
            } : undefined}
            transition={
                animate
                    ? {
                        duration: animationDuration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }
                    : undefined
            }
        />
    );
};

// Pre-configured gradient blur presets
export const AccentGradientBlur = (props: Partial<GradientBlurProps>) => (
    <GradientBlur color="#d946ef" opacity={20} {...props} />
);

export const BlueGradientBlur = (props: Partial<GradientBlurProps>) => (
    <GradientBlur color="#3b82f6" opacity={15} {...props} />
);

export const GreenGradientBlur = (props: Partial<GradientBlurProps>) => (
    <GradientBlur color="#10b981" opacity={15} {...props} />
);

export const OrangeGradientBlur = (props: Partial<GradientBlurProps>) => (
    <GradientBlur color="#f59e0b" opacity={15} {...props} />
);

// Compound background with multiple blurs
export interface GradientBackgroundProps {
    children?: React.ReactNode;
    className?: string;
    /** Primary blur color */
    primaryColor?: string;
    /** Secondary blur color */
    secondaryColor?: string;
    /** Show grid overlay */
    showGrid?: boolean;
    /** Grid opacity (0-100) */
    gridOpacity?: number;
}

export const GradientBackground = ({
    children,
    className,
    primaryColor = '#d946ef',
    secondaryColor = '#8b5cf6',
    showGrid = true,
    gridOpacity = 2,
}: GradientBackgroundProps) => {
    return (
        <div className={cn('relative overflow-hidden', className)}>
            {/* Background base */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 dark:from-neutral-950 dark:to-neutral-900" />

            {/* Gradient blurs */}
            <GradientBlur
                color={primaryColor}
                position="top-left"
                size="lg"
                opacity={20}
                animationDuration={20}
            />
            <GradientBlur
                color={secondaryColor}
                position="bottom-right"
                size="md"
                opacity={15}
                animationDuration={15}
            />

            {/* Grid overlay */}
            {showGrid && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                        opacity: gridOpacity / 100 * 5, // Scale to visible range
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

GradientBlur.displayName = 'GradientBlur';
GradientBackground.displayName = 'GradientBackground';

export default GradientBlur;
