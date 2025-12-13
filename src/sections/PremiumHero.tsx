import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../components/layout';
import { MagneticButton } from '../components/ui/MagneticButton';

// Animation variants for orchestration
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const wordVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
        }
    },
};

const subheadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.6,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 1.2,
            duration: 0.5,
        },
    },
};

export const PremiumHero = () => {
    const heroRef = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();

    // Parallax effect for scroll indicator
    const scrollIndicatorY = useTransform(scrollY, [0, 300], [0, 100]);
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

    // Track mouse position for gradient mesh
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const headline = "Crafting exceptional digital experiences";
    const words = headline.split(' ');

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated gradient mesh background */}
            <motion.div
                className="absolute inset-0 bg-neutral-950"
                style={{
                    background: `
            radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%,
              rgba(217, 70, 239, 0.15) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%,
              rgba(139, 92, 246, 0.1) 0%,
              transparent 50%
            ),
            linear-gradient(to bottom, #0a0a0a, #171717)
          `,
                }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
            />

            {/* Animated grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Gradient orbs */}
            <motion.div
                className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(217, 70, 239, 0.2), transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <Container className="relative z-10">
                <motion.div
                    className="max-w-5xl mx-auto text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Animated headline with word-by-word reveal */}
                    <div className="mb-8">
                        <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-50 leading-[1.1] tracking-tight">
                            {words.map((word, index) => (
                                <motion.span
                                    key={index}
                                    variants={wordVariants}
                                    className="inline-block mr-4 md:mr-6"
                                    style={{ display: 'inline-block' }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </div>

                    {/* Subheading with fade-in-up */}
                    <motion.p
                        variants={subheadingVariants}
                        className="text-lg sm:text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        We blend creativity with technology to deliver stunning digital products
                        that captivate users and drive results.
                    </motion.p>

                    {/* CTA buttons with magnetic effect */}
                    <motion.div
                        variants={ctaVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <MagneticButton
                            variant="primary"
                            strength={0.4}
                            onClick={() => {
                                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            View Our Work
                        </MagneticButton>
                        <MagneticButton
                            variant="ghost"
                            strength={0.3}
                            onClick={() => {
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Get in Touch
                        </MagneticButton>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Scroll indicator with pulse animation */}
            <motion.div
                variants={scrollIndicatorVariants}
                initial="hidden"
                animate="visible"
                style={{
                    y: scrollIndicatorY,
                    opacity: scrollIndicatorOpacity,
                }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    className="flex flex-col items-center gap-3 cursor-pointer"
                    onClick={() => {
                        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                    <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                        Scroll to explore
                    </span>
                    <motion.div
                        className="w-6 h-10 border-2 border-neutral-700 rounded-full flex justify-center pt-2"
                        animate={{
                            borderColor: ['rgba(115, 115, 115, 0.4)', 'rgba(217, 70, 239, 0.6)', 'rgba(115, 115, 115, 0.4)'],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <motion.div
                            className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
                            animate={{
                                y: [0, 12, 0],
                                backgroundColor: ['#a3a3a3', '#d946ef', '#a3a3a3'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default PremiumHero;
