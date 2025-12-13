import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
    mode?: 'fade' | 'slide' | 'scale' | 'slideUp';
}

const variants = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    slide: {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    },
    scale: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.05 },
    },
    slideUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    },
};

export const PageTransition = ({
    children,
    mode = 'fade',
}: PageTransitionProps) => {
    const location = useLocation();
    const variant = variants[mode];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={variant.initial}
                animate={variant.animate}
                exit={variant.exit}
                transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1], // ease-out-expo
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    className?: string;
}

export const FadeIn = ({
    children,
    delay = 0,
    duration = 0.5,
    direction = 'up',
    distance = 24,
    className,
}: FadeInProps) => {
    const getInitialPosition = () => {
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

    return (
        <motion.div
            initial={{ opacity: 0, ...getInitialPosition() }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}

export const StaggerContainer = ({
    children,
    staggerDelay = 0.1,
    className,
}: StaggerContainerProps) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export const StaggerItem = ({ children, className }: StaggerItemProps) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
