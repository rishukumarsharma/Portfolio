import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    blurDataURL?: string;
    aspectRatio?: string;
    priority?: boolean;
    onLoad?: () => void;
}

export const LazyImage = ({
    src,
    alt,
    className,
    blurDataURL,
    aspectRatio = '16/9',
    priority = false,
    onLoad,
}: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [imageSrc, setImageSrc] = useState<string | undefined>(blurDataURL);

    useEffect(() => {
        if (!priority) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsInView(true);
                            observer.disconnect();
                        }
                    });
                },
                { rootMargin: '200px' }
            );

            const element = document.getElementById(`lazy-${src}`);
            if (element) {
                observer.observe(element);
            }

            return () => observer.disconnect();
        }
    }, [src, priority]);

    useEffect(() => {
        if (isInView && src) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setImageSrc(src);
                setIsLoaded(true);
                onLoad?.();
            };
        }
    }, [isInView, src, onLoad]);

    return (
        <div
            id={`lazy-${src}`}
            className={cn('relative overflow-hidden bg-neutral-900', className)}
            style={{ aspectRatio }}
        >
            {/* Blur placeholder */}
            {blurDataURL && !isLoaded && (
                <motion.img
                    src={blurDataURL}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isLoaded ? 0 : 1 }}
                />
            )}

            {/* Actual image */}
            {imageSrc && (
                <motion.img
                    src={imageSrc}
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    loading={priority ? 'eager' : 'lazy'}
                />
            )}

            {/* Loading skeleton */}
            {!isLoaded && !blurDataURL && (
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 animate-pulse" />
            )}
        </div>
    );
};

export default LazyImage;
