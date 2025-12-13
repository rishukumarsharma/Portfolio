import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    as?: 'div' | 'section' | 'article' | 'main' | 'aside';
}

const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ children, size = 'xl', as: Tag = 'div', className, ...props }, ref) => {
        return (
            <Tag
                ref={ref}
                className={twMerge(
                    clsx(
                        'w-full mx-auto px-4 sm:px-6 lg:px-8',
                        sizeStyles[size],
                        className
                    )
                )}
                {...props}
            >
                {children}
            </Tag>
        );
    }
);

Container.displayName = 'Container';

export default Container;
