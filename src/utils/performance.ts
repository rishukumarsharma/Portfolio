/**
 * Performance Utilities
 */

/**
 * Debounce function for scroll and resize listeners
 */
export const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Throttle function for high-frequency events
 */
export const throttle = <T extends (...args: unknown[]) => void>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Hook for reduced motion preference
 */
export const usePrefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;

    const [prefersReduced, setPrefersReduced] = React.useState(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleChange = () => setPrefersReduced(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReduced;
};

/**
 * Preload critical resources
 */
export const preloadFont = (href: string, type = 'font/woff2') => {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = type;
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
};

/**
 * Lazy load images with intersection observer
 */
export const lazyLoadImages = (selector = '[data-lazy]') => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        return;
    }

    const images = document.querySelectorAll<HTMLImageElement>(selector);

    const imageObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const src = img.dataset.src;
                    const srcset = img.dataset.srcset;

                    if (src) img.src = src;
                    if (srcset) img.srcset = srcset;

                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        },
        {
            rootMargin: '50px',
        }
    );

    images.forEach((img) => imageObserver.observe(img));

    return () => imageObserver.disconnect();
};

/**
 * Request idle callback polyfill
 */
export const requestIdleCallback =
    typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => setTimeout(cb, 1);

/**
 * Get optimal animation duration based on motion preference
 */
export const getAnimationDuration = (duration: number): number => {
    return prefersReducedMotion() ? 0 : duration;
};

// Re-export React for the hook
import * as React from 'react';

export default {
    debounce,
    throttle,
    prefersReducedMotion,
    usePrefersReducedMotion,
    preloadFont,
    lazyLoadImages,
    requestIdleCallback,
    getAnimationDuration,
};
