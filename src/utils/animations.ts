import type { Variants, Transition } from 'framer-motion';

/**
 * Animation Curves
 * Consistent easing functions for different animation types
 */
export const easings = {
    // For smooth entrances and reveals
    easeOutExpo: [0.16, 1, 0.3, 1] as const,
    easeInOutExpo: [0.87, 0, 0.13, 1] as const,
    easeOutQuart: [0.25, 1, 0.5, 1] as const,
    // For interactive elements and state changes
    easeInOutQuart: [0.76, 0, 0.24, 1] as const,
    easeOutBack: [0.34, 1.56, 0.64, 1] as const,
    spring: [0.175, 0.885, 0.32, 1.275] as const,
} as const;

/**
 * Spring Configurations
 * Physics-based animations for natural motion
 */
export const springs = {
    // Default spring for most interactions
    default: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
    },
    // Snappy spring for buttons and quick interactions
    snappy: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
    },
    // Gentle spring for large movements
    gentle: {
        type: 'spring' as const,
        stiffness: 60,
        damping: 12,
    },
    // Bouncy spring
    bouncy: {
        type: 'spring' as const,
        stiffness: 500,
        damping: 25,
    },
} as const;

/**
 * Timing Constants
 * Consistent durations for different animation types
 */
export const durations = {
    // Quick micro-interactions (hover, focus, etc.)
    micro: 0.2,
    fast: 0.3,
    // Standard interactions
    normal: 0.4,
    slow: 0.6,
    slower: 0.8,
    // Page transitions
    pageTransition: 0.4,
} as const;

/**
 * Common Transitions
 */
export const transitions = {
    fast: {
        duration: durations.micro,
        ease: easings.easeOutExpo,
    } as Transition,
    normal: {
        duration: durations.normal,
        ease: easings.easeOutExpo,
    } as Transition,
    slow: {
        duration: durations.slow,
        ease: easings.easeOutExpo,
    } as Transition,
    spring: springs.snappy,
    springGentle: springs.gentle,
    bounce: springs.bouncy,
} as const;

/**
 * Stagger Configuration
 * For animating lists and groups of elements
 */
export const stagger = {
    // Standard stagger delay between items
    children: 0.1,
    // Quick stagger for smaller groups
    fast: 0.05,
    // Slower stagger for dramatic effect
    slow: 0.15,
} as const;

/**
 * Scroll Animation Configuration
 * Settings for intersection observer-based animations
 */
export const scrollConfig = {
    // Trigger animation when element is 20% visible
    threshold: 0.2,
    // Only trigger once for performance
    once: true,
    // Margin for triggering animations early/late
    margin: '-100px',
} as const;

/**
 * Viewport Configuration for Scroll Animations
 * Use with motion components: viewport={viewportConfig}
 */
export const viewportConfig = {
    once: scrollConfig.once,
    margin: scrollConfig.margin,
    amount: scrollConfig.threshold,
};

/**
 * Basic Animation Variants
 */

// Simple fade
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: transitions.normal,
    },
    exit: {
        opacity: 0,
        transition: transitions.fast,
    },
};

// Fade in from bottom
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitions.normal,
    },
    exit: {
        opacity: 0,
        y: 10,
        transition: transitions.fast,
    },
};

// Fade in from top
export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitions.normal,
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: transitions.fast,
    },
};

// Fade in from left
export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: transitions.normal,
    },
    exit: {
        opacity: 0,
        x: -10,
        transition: transitions.fast,
    },
};

// Fade in from right
export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: transitions.normal,
    },
    exit: {
        opacity: 0,
        x: 10,
        transition: transitions.fast,
    },
};

/**
 * Scale Animations
 */

// Scale in from center
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: transitions.normal,
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: transitions.fast,
    },
};

// Scale in with upward movement
export const scaleInUp: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: transitions.normal,
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: transitions.fast,
    },
};

// Scale effect for hover states
export const scaleOnHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: transitions.fast,
    },
    tap: { scale: 0.98 },
};

/**
 * Slide Animations
 */

// Slide up
export const slideInUp: Variants = {
    hidden: { y: '100%' },
    visible: {
        y: 0,
        transition: transitions.normal,
    },
    exit: {
        y: '100%',
        transition: transitions.fast,
    },
};

// Slide down
export const slideInDown: Variants = {
    hidden: { y: '-100%' },
    visible: {
        y: 0,
        transition: transitions.normal,
    },
    exit: {
        y: '-100%',
        transition: transitions.fast,
    },
};

// Slide from right
export const slideInFromRight: Variants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: durations.pageTransition,
            ease: easings.easeOutExpo,
        },
    },
    exit: {
        x: '100%',
        opacity: 0,
        transition: transitions.fast,
    },
};

// Slide from left
export const slideInFromLeft: Variants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: durations.pageTransition,
            ease: easings.easeOutExpo,
        },
    },
    exit: {
        x: '-100%',
        opacity: 0,
        transition: transitions.fast,
    },
};

/**
 * Stagger Animations
 */

// Stagger container
export const staggerContainer = (staggerDelay = stagger.children): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: stagger.fast,
            staggerDirection: -1,
        },
    },
});

// Fast stagger container
export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger.fast,
            delayChildren: 0.05,
        },
    },
};

// Stagger item
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitions.normal,
    },
    exit: {
        opacity: 0,
        y: 10,
    },
};

/**
 * Special Effects
 */

// Blur reveal
export const blurReveal: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: durations.slower,
            ease: easings.easeOutExpo,
        },
    },
    exit: {
        opacity: 0,
        filter: 'blur(10px)',
        transition: transitions.fast,
    },
};

/**
 * Hover & Tap Animations
 */

// Scale on hover
export const hoverScale = {
    scale: 1.02,
    transition: transitions.fast,
};

// Lift on hover
export const hoverLift = {
    y: -4,
    transition: transitions.fast,
};

// Glow on hover
export const hoverGlow = {
    boxShadow: '0 0 40px rgba(217, 70, 239, 0.4)',
    transition: transitions.fast,
};

// Scale down on tap
export const tapScale = {
    scale: 0.98,
};

/**
 * Page Transitions
 */

export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: durations.pageTransition,
            ease: easings.easeOutExpo,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: durations.fast,
            ease: easings.easeInOutQuart,
        },
    },
};

/**
 * Helper Functions
 */

// Create custom stagger animation
export const createStaggerAnimation = (
    delay = 0,
    staggerDelay = stagger.children
): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay,
            staggerChildren: staggerDelay,
        },
    },
});

// Create fade animation with custom direction
export const createFadeAnimation = (
    direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up',
    distance = 30,
    duration = durations.normal
): Variants => {
    const getHiddenPosition = () => {
        switch (direction) {
            case 'up':
                return { y: distance };
            case 'down':
                return { y: -distance };
            case 'left':
                return { x: distance };
            case 'right':
                return { x: -distance };
            default:
                return {};
        }
    };

    return {
        hidden: { opacity: 0, ...getHiddenPosition() },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                ease: easings.easeOutExpo,
            },
        },
    };
};

// Create custom transition
export const createTransition = (
    duration: keyof typeof durations = 'normal',
    easing: keyof typeof easings = 'easeOutExpo'
): Transition => ({
    duration: durations[duration],
    ease: easings[easing],
});

// Create spring transition
export const createSpringTransition = (
    preset: keyof typeof springs = 'default'
): Transition => springs[preset];

// Create stagger transition
export const createStaggerTransition = (
    delay: keyof typeof stagger = 'children',
    delayChildren = 0.1
): Transition => ({
    staggerChildren: stagger[delay],
    delayChildren,
});

/**
 * Complete Motion System Export
 */
export const motionSystem = {
    easings,
    springs,
    durations,
    stagger,
    scrollConfig,
    viewportConfig,
    transitions,
    variants: {
        fadeIn,
        fadeInUp,
        fadeInDown,
        fadeInLeft,
        fadeInRight,
        scaleIn,
        scaleInUp,
        scaleOnHover,
        slideInUp,
        slideInDown,
        slideInFromRight,
        slideInFromLeft,
        staggerContainer,
        staggerContainerFast,
        staggerItem,
        blurReveal,
        pageTransition,
    },
    hover: {
        hoverScale,
        hoverLift,
        hoverGlow,
    },
    tap: {
        tapScale,
    },
    helpers: {
        createStaggerAnimation,
        createFadeAnimation,
        createTransition,
        createSpringTransition,
        createStaggerTransition,
    },
};

// Export default for convenience
export default motionSystem;
