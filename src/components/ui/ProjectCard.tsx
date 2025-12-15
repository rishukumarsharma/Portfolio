import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { OptimizedImage } from './OptimizedImage';
import { getProjectPlaceholder } from '../../utils/placeholders';

export interface ProjectCardProps {
    /** Project title */
    title: string;
    /** Short description or subtitle */
    subtitle?: string;
    /** Full description */
    description?: string;
    /** Image URL for the project thumbnail */
    image?: string;
    /** Placeholder gradient color when no image */
    accentColor?: string;
    /** Array of technology/skill tags */
    tags?: string[];
    /** Year of the project */
    year?: string;
    /** Category label */
    category?: string;
    /** External link URL */
    href?: string;
    /** Click handler */
    onClick?: () => void;
    /** Additional CSS classes */
    className?: string;
    /** Card size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Show/hide tags */
    showTags?: boolean;
    /** Aspect ratio of image container */
    aspectRatio?: 'video' | 'square' | 'portrait';
}

const sizeStyles = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
};

const aspectStyles = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
};

export const ProjectCard = ({
    title,
    subtitle,
    description,
    image,
    tags = [],
    year,
    category,
    href,
    onClick,
    className,
    size = 'md',
    showTags = true,
    aspectRatio = 'video',
}: ProjectCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const CardWrapper = ({ children }: { children: ReactNode }) => {
        if (href) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            );
        }
        return <>{children}</>;
    };

    return (
        <CardWrapper>
            <motion.article
                className={cn(
                    'group relative bg-neutral-900 border border-neutral-800 overflow-hidden cursor-pointer',
                    'transition-colors duration-300',
                    'hover:border-neutral-700',
                    'dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-700',
                    sizeStyles[size],
                    className
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
                initial={{ y: 0 }}
                whileHover={{ y: -8 }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                }}
            >
                {/* Image Container */}
                <div className={cn('relative overflow-hidden bg-neutral-800', aspectStyles[aspectRatio])}>
                    {/* Use OptimizedImage with smart placeholder fallback */}
                    <motion.div
                        className="w-full h-full"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <OptimizedImage
                            src={image || getProjectPlaceholder(category)}
                            alt={title}
                            className="w-full h-full"
                        />
                    </motion.div>

                    {/* Hover Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-neutral-950/70 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-950 rounded-full font-medium text-sm"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{
                                y: isHovered ? 0 : 20,
                                opacity: isHovered ? 1 : 0
                            }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            View Project
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.div>
                    </motion.div>

                    {/* Category Badge */}
                    {category && (
                        <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 text-xs font-medium bg-neutral-950/80 backdrop-blur-sm text-neutral-200 rounded-full">
                                {category}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className={cn(
                            'font-semibold text-neutral-50 group-hover:text-accent-400 transition-colors',
                            size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-base' : 'text-lg'
                        )}>
                            {title}
                        </h3>
                        {year && (
                            <span className="text-sm text-neutral-500 shrink-0">{year}</span>
                        )}
                    </div>

                    {subtitle && (
                        <p className="text-sm text-neutral-400 mb-3">{subtitle}</p>
                    )}

                    {description && (
                        <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{description}</p>
                    )}

                    {/* Tags */}
                    {showTags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag}
                                    className={cn(
                                        'px-2 py-1 text-xs text-neutral-400 bg-neutral-800/80 rounded',
                                        'dark:bg-neutral-800 dark:text-neutral-400'
                                    )}
                                >
                                    {tag}
                                </span>
                            ))}
                            {tags.length > 4 && (
                                <span className="px-2 py-1 text-xs text-neutral-500">
                                    +{tags.length - 4}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </motion.article>
        </CardWrapper>
    );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
