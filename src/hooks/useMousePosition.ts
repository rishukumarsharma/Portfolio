import { useState, useEffect, useCallback, type RefObject } from 'react';

interface MousePosition {
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
}

interface UseMousePositionOptions {
    includeTouch?: boolean;
    targetRef?: RefObject<HTMLElement>;
}

export const useMousePosition = (
    options: UseMousePositionOptions = {}
): MousePosition => {
    const { includeTouch = false, targetRef } = options;

    const [position, setPosition] = useState<MousePosition>({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
    });

    const updatePosition = useCallback(
        (clientX: number, clientY: number) => {
            const target = targetRef?.current;

            if (target) {
                const rect = target.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;

                setPosition({
                    x,
                    y,
                    normalizedX: (x / rect.width) * 2 - 1,
                    normalizedY: (y / rect.height) * 2 - 1,
                });
            } else {
                setPosition({
                    x: clientX,
                    y: clientY,
                    normalizedX: (clientX / window.innerWidth) * 2 - 1,
                    normalizedY: (clientY / window.innerHeight) * 2 - 1,
                });
            }
        },
        [targetRef]
    );

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            updatePosition(event.clientX, event.clientY);
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                updatePosition(touch.clientX, touch.clientY);
            }
        };

        const target = targetRef?.current || window;

        target.addEventListener('mousemove', handleMouseMove as EventListener);
        if (includeTouch) {
            target.addEventListener('touchmove', handleTouchMove as EventListener, {
                passive: true,
            });
        }

        return () => {
            target.removeEventListener('mousemove', handleMouseMove as EventListener);
            if (includeTouch) {
                target.removeEventListener('touchmove', handleTouchMove as EventListener);
            }
        };
    }, [includeTouch, targetRef, updatePosition]);

    return position;
};

interface HoverPosition {
    x: number;
    y: number;
    isHovering: boolean;
}

export const useHoverPosition = (
    elementRef: RefObject<HTMLElement>
): HoverPosition => {
    const [position, setPosition] = useState<HoverPosition>({
        x: 0,
        y: 0,
        isHovering: false,
    });

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            setPosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
                isHovering: true,
            });
        };

        const handleMouseLeave = () => {
            setPosition((prev) => ({ ...prev, isHovering: false }));
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [elementRef]);

    return position;
};

interface MagneticOptions {
    strength?: number;
    ease?: number;
}

export const useMagnetic = (
    elementRef: RefObject<HTMLElement>,
    options: MagneticOptions = {}
) => {
    const { strength = 0.3, ease = 0.1 } = options;
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        let animationId: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            targetX = (event.clientX - centerX) * strength;
            targetY = (event.clientY - centerY) * strength;
        };

        const handleMouseLeave = () => {
            targetX = 0;
            targetY = 0;
        };

        const animate = () => {
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;

            setTransform({ x: currentX, y: currentY });
            animationId = requestAnimationFrame(animate);
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
        animationId = requestAnimationFrame(animate);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, [elementRef, strength, ease]);

    return {
        style: {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
        },
    };
};

export default useMousePosition;
