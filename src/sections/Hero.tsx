import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '../components/layout';
import { Button } from '../components/ui';

export const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Mouse position for magnetic effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const magneticX = useSpring(mouseX, springConfig);
    const magneticY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.1);
        mouseY.set((e.clientY - centerY) * 0.1);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Enhanced background with mesh gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />

            {/* Radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,70,239,0.08),transparent_50%)]" />

            {/* Animated gradient orbs - more dynamic */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full blur-[140px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(217,70,239,0.25) 0%, rgba(192,38,211,0.15) 40%, transparent 70%)',
                    }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(217,70,239,0.1) 50%, transparent 70%)',
                    }}
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent-400/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            <motion.div style={{ y, opacity }}>
                <Container className="relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Badge - glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 rounded-full border border-white/10 backdrop-blur-xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <motion.span
                                className="w-2 h-2 bg-success-500 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.6, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            />
                            <span className="text-sm font-medium text-neutral-200 tracking-wide">Available for new projects</span>
                        </motion.div>

                        {/* Heading - staggered word animation */}
                        <div className="mb-8">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
                            >
                                {['I', 'create'].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.2 + i * 0.1,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="inline-block mr-4 text-white"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                                <br />
                                <motion.span
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.4,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="inline-block relative"
                                >
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-accent-400 via-pink-400 to-accent-500"
                                        style={{
                                            backgroundSize: '200% auto',
                                        }}
                                    >
                                        digital experiences
                                    </span>
                                    {/* Underline decoration */}
                                    <motion.div
                                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-500/50 via-pink-500/50 to-accent-600/50 rounded-full blur-sm"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </motion.span>
                                <br />
                                {['that', 'inspire'].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.5 + i * 0.1,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="inline-block mr-4 text-white"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h1>
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                        >
                            A product designer and developer focused on crafting beautiful,
                            user-centered digital products that solve real problems.
                        </motion.p>

                        {/* CTAs with magnetic effect */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-wrap items-center justify-center gap-6"
                        >
                            <motion.div
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{ x: magneticX, y: magneticY }}
                            >
                                <Button
                                    size="lg"
                                    onClick={() => {
                                        document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group"
                                >
                                    <span>View My Work</span>
                                    <motion.svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        animate={{ y: [0, 3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </motion.svg>
                                </Button>
                            </motion.div>
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => {
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="backdrop-blur-sm"
                            >
                                Get in Touch
                            </Button>
                        </motion.div>

                        {/* Stats or highlights */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
                        >
                            {[
                                { value: '50+', label: 'Projects Delivered' },
                                { value: '5+', label: 'Years Experience' },
                                { value: '100%', label: 'Client Satisfaction' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.3 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-neutral-500 uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </Container>
            </motion.div>

            {/* Modern scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                    onClick={() => {
                        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <span className="text-xs text-neutral-500 uppercase tracking-widest font-medium group-hover:text-neutral-400 transition-colors">
                        Scroll to explore
                    </span>
                    <div className="relative">
                        <div className="w-7 h-11 border-2 border-neutral-700 group-hover:border-neutral-600 rounded-full flex justify-center pt-2 transition-colors">
                            <motion.div
                                animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1.5 h-1.5 bg-accent-400 rounded-full"
                            />
                        </div>
                        {/* Glow effect */}
                        <motion.div
                            className="absolute inset-0 bg-accent-500/20 rounded-full blur-xl"
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
