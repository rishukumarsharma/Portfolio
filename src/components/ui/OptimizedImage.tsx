import { useState } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export const OptimizedImage = ({ src, alt, className = '', priority = false }: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Debug logging
    console.log('OptimizedImage rendering:', { src, alt, isLoaded, hasError });

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Blur placeholder */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse z-10" />
            )}

            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                style={{
                    opacity: isLoaded || hasError ? 1 : 0,
                    transition: 'opacity 0.6s ease-out'
                }}
                onLoad={() => {
                    console.log('Image loaded:', src);
                    setIsLoaded(true);
                }}
                onError={(e) => {
                    console.error('Image error:', src, e);
                    setHasError(true);
                }}
                loading={priority ? "eager" : "lazy"}
            />
        </div>
    );
};

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
