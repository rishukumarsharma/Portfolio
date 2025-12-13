import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface CountUpMetricProps {
    value: string;
    label: string;
    duration?: number;
    delay?: number;
    className?: string;
}

export const CountUpMetric = ({
    value,
    label,
    duration = 2,
    delay = 0,
    className,
}: CountUpMetricProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [displayValue, setDisplayValue] = useState('0');

    // Extract number and suffix (e.g., "40%" -> 40, "%")
    const match = value.match(/^([\d.]+)(.*)$/);
    const numericValue = match ? parseFloat(match[1]) : 0;
    const suffix = match ? match[2] : '';

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        duration: duration * 1000,
        bounce: 0,
    });

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                motionValue.set(numericValue);
            }, delay * 1000);
        }
    }, [isInView, numericValue, delay, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            // Format number with appropriate decimals
            const formatted = numericValue % 1 === 0
                ? Math.round(latest).toString()
                : latest.toFixed(1);
            setDisplayValue(formatted + suffix);
        });

        return unsubscribe;
    }, [springValue, suffix, numericValue]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            <div className="text-4xl md:text-5xl font-bold text-accent-400 mb-2">
                {displayValue}
            </div>
            <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {label}
            </div>
        </motion.div>
    );
};

export default CountUpMetric;
