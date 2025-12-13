import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

interface ScrollAnimationReturn {
    ref: (node?: Element | null) => void;
    inView: boolean;
    hasAnimated: boolean;
    progress: number;
}

export const useScrollAnimation = (
    options: ScrollAnimationOptions = {}
): ScrollAnimationReturn => {
    const { threshold = 0.2, rootMargin = '0px', triggerOnce = true } = options;
    const [hasAnimated, setHasAnimated] = useState(false);
    const progress = 0; // Reserved for future scroll progress tracking

    const { ref, inView } = useInView({
        threshold,
        rootMargin,
        triggerOnce,
    });

    useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);

    return {
        ref,
        inView,
        hasAnimated,
        progress,
    };
};

interface ScrollProgressOptions {
    offset?: [string, string];
}

export const useScrollProgress = (options: ScrollProgressOptions = {}) => {
    const { offset = ['start end', 'end start'] } = options;
    const [progress, setProgress] = useState(0);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress based on element position
            const elementTop = rect.top;
            const elementBottom = rect.bottom;

            // Progress from 0 to 1 as element scrolls through viewport
            const scrollProgress =
                1 - (elementTop - windowHeight) / (elementBottom - windowHeight + rect.height);

            setProgress(Math.min(Math.max(scrollProgress, 0), 1));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset]);

    const setRef = useCallback((node: HTMLElement | null) => {
        elementRef.current = node;
    }, []);

    return { ref: setRef, progress };
};

interface ParallaxOptions {
    speed?: number;
    direction?: 'vertical' | 'horizontal';
}

export const useParallax = (options: ParallaxOptions = {}) => {
    const { speed = 0.5, direction = 'vertical' } = options;
    const [offset, setOffset] = useState(0);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const centerY = rect.top + rect.height / 2;
            const distanceFromCenter = centerY - windowHeight / 2;

            setOffset(distanceFromCenter * speed * -1);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    const setRef = useCallback((node: HTMLElement | null) => {
        elementRef.current = node;
    }, []);

    const style =
        direction === 'vertical'
            ? { transform: `translateY(${offset}px)` }
            : { transform: `translateX(${offset}px)` };

    return { ref: setRef, style, offset };
};

export default useScrollAnimation;
