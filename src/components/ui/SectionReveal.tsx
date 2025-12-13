import { useRef, type ReactNode } from 'react';
import { motion, useInView, type Variant } from 'framer-motion';
import { cn } from '../../utils/cn';

export type RevealAnimation =
    | 'fadeUp'
    | 'fadeDown'
    | 'fadeLeft'
    | 'fadeRight'
    | 'scale'
    | 'blur'
    | 'slideUp'
    | 'rotate';

export interface SectionRevealProps {
    children: ReactNode;
    /** Animation type */
    animation?: RevealAnimation;
    /** Delay before animation starts (in seconds) */
    delay?: number;
    /** Animation duration (in seconds) */
    duration?: number;
    /** How much of element should be visible before triggering (0-1) */
    threshold?: number;
    /** Only animate once */
    once?: boolean;
    /** Custom distance for movement animations */
    distance?: number;
    /** Enable stagger for direct children */
    stagger?: boolean;
    /** Stagger delay between children */
    staggerDelay?: number;
    /** Additional CSS classes */
    className?: string;
    /** Custom variants override */
    customVariants?: {
        hidden: Variant;
        visible: Variant;
    };
}

type AnimationVariants = {
    hidden: Variant;
    visible: Variant;
};

const createAnimations = (distance: number, duration: number): Record<RevealAnimation, AnimationVariants> => ({
    fadeUp: {
        hidden: { opacity: 0, y: distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] }
        },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] }
        },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: distance },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] }
        },
    },
    fadeRight: {
        hidden: { opacity: 0, x: -distance },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] }
        },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, ease: [0.16, 1, 0.3, 1] }
        },
    },
    blur: {
        hidden: { opacity: 0, filter: 'blur(12px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration, ease: [0.16, 1, 0.3, 1] }
        },
    },
    slideUp: {
        hidden: { y: '100%', opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration, ease: [0.16, 1, 0.3, 1] }
        },
    },
    rotate: {
        hidden: { opacity: 0, rotate: -10, y: distance / 2 },
        visible: {
            opacity: 1,
            rotate: 0,
            y: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] }
        },
    },
});

export const SectionReveal = ({
    children,
    animation = 'fadeUp',
    delay = 0,
    duration = 0.6,
    threshold = 0.2,
    once = true,
    distance = 40,
    stagger = false,
    staggerDelay = 0.1,
    className,
    customVariants,
}: SectionRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once,
        amount: threshold,
    });

    const animations = createAnimations(distance, duration);
    const selectedAnimation = customVariants || animations[animation];

    // Stagger container variant
    const containerVariants = stagger
        ? {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerDelay,
                    delayChildren: delay,
                },
            },
        }
        : selectedAnimation;

    return (
        <motion.div
            ref={ref}
            className={cn(className)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            transition={!stagger ? { delay } : undefined}
        >
            {stagger
                ? // Wrap each child in a motion.div for staggering
                Array.isArray(children)
                    ? children.map((child, index) => (
                        <motion.div key={index} variants={selectedAnimation}>
                            {child}
                        </motion.div>
                    ))
                    : <motion.div variants={selectedAnimation}>{children}</motion.div>
                : children}
        </motion.div>
    );
};

// Convenience components for common use cases
export const FadeInUp = (props: Omit<SectionRevealProps, 'animation'>) => (
    <SectionReveal {...props} animation="fadeUp" />
);

export const FadeInLeft = (props: Omit<SectionRevealProps, 'animation'>) => (
    <SectionReveal {...props} animation="fadeLeft" />
);

export const FadeInRight = (props: Omit<SectionRevealProps, 'animation'>) => (
    <SectionReveal {...props} animation="fadeRight" />
);

export const ScaleIn = (props: Omit<SectionRevealProps, 'animation'>) => (
    <SectionReveal {...props} animation="scale" />
);

export const BlurIn = (props: Omit<SectionRevealProps, 'animation'>) => (
    <SectionReveal {...props} animation="blur" />
);

SectionReveal.displayName = 'SectionReveal';

export default SectionReveal;
